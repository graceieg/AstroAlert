import React, { useState, useEffect } from 'react';
import svgPaths from "./imports/svg-lscuvymg1x";
import { projectId, publicAnonKey } from './utils/supabase/info';

interface SpaceWeatherData {
  kpIndex: number;
  solarWind: {
    speed: number;
    density: number;
    temperature: number;
  };
  geomagneticActivity: string;
  solarActivity: {
    xrayFlux: string;
    solarFlares: number;
    sunspotNumber: number;
  };
  lastUpdated: string;
  dataSource?: string;
  events?: any[];
}

interface SatelliteData {
  name: string;
  id: string;
  position: {
    lat: number;
    lng: number;
    alt: number;
  };
  velocity: number;
  status: string;
}

interface AlertData {
  id: string;
  type: string;
  severity: 'low' | 'moderate' | 'high' | 'extreme';
  message: string;
  timestamp: string;
  active: boolean;
  source?: string;
}

interface HistoricalDataPoint {
  timestamp: string;
  kpIndex: number;
  solarWindSpeed: number;
  xrayFlux: number;
  alerts: number;
}

interface Settings {
  realTimeUpdates: boolean;
  alertNotifications: boolean;
  updateInterval: number;
  temperatureUnit: 'kelvin' | 'celsius' | 'fahrenheit';
  timeFormat: '24' | '12';
  autoRefresh: boolean;
  soundAlerts: boolean;
  theme: 'light' | 'dark' | 'auto';
}

function AstroAlertApp() {
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [spaceWeatherData, setSpaceWeatherData] = useState<SpaceWeatherData | null>(null);
  const [satellites, setSatellites] = useState<SatelliteData[]>([]);
  const [alerts, setAlerts] = useState<AlertData[]>([]);
  const [historicalData, setHistoricalData] = useState<HistoricalDataPoint[]>([]);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [isLive, setIsLive] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    realTimeUpdates: true,
    alertNotifications: true,
    updateInterval: 30,
    temperatureUnit: 'kelvin',
    timeFormat: '24',
    autoRefresh: true,
    soundAlerts: false,
    theme: 'light'
  });

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('astroalert-settings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Error parsing saved settings:', error);
      }
    }
  }, []);

  // Initial data fetch on mount
  useEffect(() => {
    // Add small delay to prevent race conditions
    const initializeData = async () => {
      await fetchSpaceWeatherData();
      await new Promise(resolve => setTimeout(resolve, 100));
      await fetchSatelliteData();
      await new Promise(resolve => setTimeout(resolve, 100));
      await fetchAlerts();
      await new Promise(resolve => setTimeout(resolve, 100));
      await fetchHistoricalData();
    };
    
    initializeData();
  }, []);

  // Set up real-time updates based on settings
  useEffect(() => {
    if (!settings.realTimeUpdates) return;

    const updateInterval = settings.updateInterval * 1000;
    const interval = setInterval(() => {
      fetchSpaceWeatherData();
      fetchSatelliteData();
      fetchAlerts();
    }, updateInterval);

    return () => clearInterval(interval);
  }, [settings.realTimeUpdates, settings.updateInterval]);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('astroalert-settings', JSON.stringify(settings));
  }, [settings]);

  const fetchSpaceWeatherData = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-378d778b/space-weather`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        setSpaceWeatherData(data);
        setLastUpdate(new Date().toLocaleTimeString());
        setIsLive(true);
      } else {
        console.error('Space weather API returned error:', response.status);
        setIsLive(false);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error('Space weather data fetch timed out');
      } else {
        console.error('Error fetching space weather data:', error);
      }
      setIsLive(false);
    }
  };

  const fetchSatelliteData = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-378d778b/satellites`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        // Validate data structure before setting state
        const validatedData = Array.isArray(data) ? data.map(sat => ({
          name: sat.name || 'Unknown Satellite',
          id: sat.id || 'unknown',
          position: {
            lat: Number(sat.position?.lat) || 0,
            lng: Number(sat.position?.lng) || 0,
            alt: Number(sat.position?.alt) || 400
          },
          velocity: Number(sat.velocity) || 7.0,
          status: sat.status || 'unknown'
        })) : [];
        
        setSatellites(validatedData);
      } else {
        console.error('Satellite API returned error:', response.status);
        // Set empty array on API error to prevent crashes
        setSatellites([]);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error('Satellite data fetch timed out');
      } else {
        console.error('Error fetching satellite data:', error);
      }
      // Set empty array on any error to prevent crashes
      setSatellites([]);
    }
  };

  const fetchAlerts = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout
      
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-378d778b/alerts`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        setAlerts(data);
        
        // Play sound alert if enabled and there are new critical alerts
        if (settings.soundAlerts && settings.alertNotifications) {
          const criticalAlerts = data.filter((alert: AlertData) => 
            alert.active && (alert.severity === 'high' || alert.severity === 'extreme')
          );
          if (criticalAlerts.length > 0) {
            // Create audio context for alert sound
            try {
              const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
              const oscillator = audioContext.createOscillator();
              const gainNode = audioContext.createGain();
              
              oscillator.connect(gainNode);
              gainNode.connect(audioContext.destination);
              
              oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
              gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
              
              oscillator.start();
              oscillator.stop(audioContext.currentTime + 0.2);
            } catch (e) {
              console.log('Audio alert not available');
            }
          }
        }
      } else {
        console.error('Alerts API returned error:', response.status);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error('Alerts data fetch timed out');
      } else {
        console.error('Error fetching alerts:', error);
      }
    }
  };

  const fetchHistoricalData = async (timeRange = '7d') => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-378d778b/historical?range=${timeRange}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        setHistoricalData(data.dataPoints || []);
      } else {
        console.error('Historical data API returned error:', response.status);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error('Historical data fetch timed out');
      } else {
        console.error('Error fetching historical data:', error);
      }
    }
  };

  const updateSettings = async (newSettings: Partial<Settings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-378d778b/settings`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedSettings),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error('Settings save timed out');
      } else {
        console.error('Error saving settings:', error);
      }
    }
  };

  const formatTemperature = (tempKelvin: number) => {
    switch (settings.temperatureUnit) {
      case 'celsius':
        return `${(tempKelvin - 273.15).toFixed(0)}°C`;
      case 'fahrenheit':
        return `${((tempKelvin - 273.15) * 9/5 + 32).toFixed(0)}°F`;
      default:
        return `${tempKelvin.toFixed(0)}K`;
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    if (settings.timeFormat === '12') {
      return date.toLocaleTimeString('en-US', { hour12: true });
    }
    return date.toLocaleTimeString('en-US', { hour12: false });
  };

  const activeAlerts = alerts.filter(alert => alert.active);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showNotifications && !(event.target as Element).closest('.notification-dropdown')) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotifications]);

  return (
    <div className="min-h-screen bg-[#0f1419] w-full" data-name="App">


      {/* Header */}
      <div className="sticky top-0 z-50 bg-white h-[64px] w-full">
        <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(232,234,237,0.12)] border-solid inset-0 pointer-events-none" />
        <div className="absolute top-0 left-0 w-[100vw] h-[63px] bg-gradient-to-r from-[rgba(79,195,247,0.05)] via-[rgba(0,0,0,0)] via-50% to-[rgba(255,138,101,0.05)]" />

        
        {/* Logo and Title */}
        <div className="absolute h-[44px] left-[24px] top-[9.5px] w-[193.227px]">
          <div className="absolute content-stretch flex flex-col h-[44px] items-start left-[16px] top-[0.5px] w-[203px]">
            <div className="h-[28px] relative shrink-0 w-full">
              <p className="absolute font-['Kode_Mono:Bold',_sans-serif] font-bold leading-[28px] left-0 text-[#585467] text-[20px] text-nowrap top-0 tracking-[0.0508px] whitespace-pre">AstroAlert</p>
            </div>
            <div className="h-[16px] relative shrink-0 w-full">
              <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[16px] left-0 not-italic text-[#a0a9b8] text-[12px] text-nowrap top-px whitespace-pre">Space Weather Monitoring</p>
            </div>
          </div>
        </div>

        {/* Header Right Section */}
        <div className="absolute content-stretch flex gap-[24px] h-[36px] items-center left-[943px] top-[13.5px] w-[411.922px]">
          {/* Time Display */}
          <div className="h-[36px] relative shrink-0 w-[151.719px]">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[36px] items-start relative w-[151.719px]">
              <div className="h-[20px] relative shrink-0 w-full">
                <p className="absolute font-['Inter:Bold',_sans-serif] font-bold leading-[20px] left-[128.21px] not-italic text-[#585467] text-[14px] text-right top-[0.5px] tracking-[0.28px] translate-x-[-100%] w-[150px]">
                  {formatTime(new Date().toISOString())} UTC
                </p>
              </div>
              <div className="h-[16px] relative shrink-0 w-full">
                <p className="absolute font-['Cousine:Regular',_sans-serif] leading-[16px] left-[152px] not-italic text-[#a0a9b8] text-[12px] text-right top-0 translate-x-[-100%] w-[200px]">
                  Last update: {lastUpdate}
                </p>
              </div>
            </div>
          </div>

          {/* Status and Controls */}
          <div className="basis-0 grow h-[32px] min-h-px min-w-px relative shrink-0">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-full">
              {/* System Status */}
              <div className={`absolute box-border content-stretch flex gap-[4px] h-[30px] items-center left-[-350px] px-[13px] py-px rounded-[1.67772e+07px] top-px w-[152.203px] ${isLive ? 'bg-[rgba(5,223,114,0.1)]' : 'bg-[rgba(255,138,101,0.1)]'}`}>
                <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[1.67772e+07px] ${isLive ? 'border-[rgba(5,223,114,0.2)]' : 'border-[rgba(255,138,101,0.2)]'}`} />
                <div className={`relative rounded-[1.67772e+07px] shrink-0 size-[8px] ${isLive ? 'bg-[#00994c]' : 'bg-[#ff8a65]'} opacity-[0.913]`}>
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[8px]" />
                </div>
                <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
                    <p className={`absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-0 not-italic text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre ${isLive ? 'text-[#00994c]' : 'text-[#ff8a65]'}`}>
                      {isLive ? 'Systems Nominal' : 'Connection Issue'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Alert Button */}
              <div className="absolute h-[32px] left-0 rounded-[8px] top-0 w-[36px] relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="absolute left-[10px] size-[16px] top-[8px] hover:opacity-70 transition-opacity cursor-pointer"
                >
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                    <g>
                      <path d={svgPaths.p1e6eff00} stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      <path d={svgPaths.p5baad20} stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    </g>
                  </svg>
                </button>
                {activeAlerts.length > 0 && (
                  <div className="absolute bg-[#ff5a5f] left-[20px] opacity-[0.913] rounded-[8px] size-[20px] top-[-4px] animate-pulse">
                    <div className="box-border content-stretch flex gap-[4px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-[20px]">
                      <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0f1419] text-[12px] text-nowrap whitespace-pre">{activeAlerts.length}</p>
                    </div>
                  </div>
                )}
                
                {/* Notification Dropdown */}
                {showNotifications && (
                  <div className="notification-dropdown absolute top-[40px] left-[-200px] w-[320px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-[400px] overflow-y-auto">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-['Kode_Mono:Bold',_sans-serif] font-bold text-gray-900 text-lg">Notifications</h3>
                      <p className="font-['Roboto_Mono:Regular',_sans-serif] text-sm text-gray-600">Recent alerts and system updates</p>
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      {activeAlerts.length > 0 ? (
                        activeAlerts.map((alert) => (
                          <div key={alert.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                            <div className="flex items-start gap-3">
                              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                alert.severity === 'extreme' ? 'bg-red-500' :
                                alert.severity === 'high' ? 'bg-orange-500' :
                                alert.severity === 'moderate' ? 'bg-yellow-500' :
                                'bg-blue-500'
                              }`}></div>
                              <div className="flex-1">
                                <div className="font-['Kode_Mono:Medium',_sans-serif] font-medium text-sm text-gray-900">{alert.type}</div>
                                <div className="font-['Roboto_Mono:Regular',_sans-serif] text-xs text-gray-600 mt-1">{alert.message}</div>
                                <div className="flex items-center gap-2 mt-2">
                                  <span className={`text-xs px-2 py-1 rounded ${
                                    alert.severity === 'extreme' ? 'bg-red-100 text-red-700' :
                                    alert.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                                    alert.severity === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-blue-100 text-blue-700'
                                  }`}>
                                    {alert.severity.toUpperCase()}
                                  </span>
                                  <span className="font-['Roboto_Mono:Regular',_sans-serif] text-xs text-gray-500">
                                    {formatTime(alert.timestamp)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-6 text-center">
                          <div className="text-green-600 mb-2">
                            <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <p className="font-['Roboto_Mono:Regular',_sans-serif] text-sm text-gray-600">No active alerts</p>
                          <p className="font-['Roboto_Mono:Regular',_sans-serif] text-xs text-gray-500 mt-1">All systems nominal</p>
                        </div>
                      )}
                    </div>
                    <div className="p-3 bg-gray-50 border-t border-gray-200">
                      <button 
                        onClick={() => {
                          setCurrentSection('alerts');
                          setShowNotifications(false);
                        }}
                        className="w-full text-center font-['Roboto_Mono:Medium',_sans-serif] text-sm text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        View All Alerts
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex w-full min-h-[calc(100vh-64px)] bg-[rgba(255,255,255,0)]">
        {/* Sidebar */}
        <div className="bg-white sticky top-0 h-[calc(100vh-64px)] w-[288px] shrink-0 overflow-y-auto">
          <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-[rgba(232,234,237,0.06)] border-solid inset-0 pointer-events-none shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
          
          {/* Navigation Header */}
          <div className="h-[65px] relative shrink-0 w-full">
            <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(232,234,237,0.12)] border-solid inset-0 pointer-events-none" />
            <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[65px] items-start pb-px pt-[16px] px-[16px] relative w-[287px]">
              <div className="h-[32px] relative rounded-[8px] shrink-0 w-full">
                <div className="absolute h-[20px] left-[10px] top-[6px] w-[89.961px]">
                  <p className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[20px] left-0 not-italic text-[14px] text-[rgba(123,123,123,1)] text-nowrap top-[0.5px] tracking-[0.1996px] whitespace-pre">NAVIGATION</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 relative w-full">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] items-start pb-0 pt-[8px] px-[8px] relative w-full">
              
              {/* Dashboard */}
              <button 
                onClick={() => setCurrentSection('dashboard')}
                className={`h-[48px] relative rounded-[8px] shrink-0 w-full ${currentSection === 'dashboard' ? 'bg-[rgba(79,195,247,0.15)] border border-[rgba(79,195,247,0.3)] shadow-[0px_10px_15px_-3px_rgba(79,195,247,0.1),0px_4px_6px_-4px_rgba(79,195,247,0.1)]' : ''}`}
              >
                <div className="absolute left-[10px] size-[16px] top-[16px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                    <g>
                      <path d={svgPaths.p542e500} stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      <path d="M11 5L12.6667 3.33333" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      <path d={svgPaths.pd813f40} stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      <path d={svgPaths.p217bd500} stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      <path d={svgPaths.p3e5de570} stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    </g>
                  </svg>
                </div>
                <div className="absolute content-stretch flex flex-col h-[36px] items-start left-[39px] top-[6px] w-[80.68px]">
                  <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[72.008px]">
                    <p className="absolute font-['Roboto_Mono:Medium',_sans-serif] font-medium leading-[20px] left-0 text-[#6a6a6a] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Dashboard</p>
                  </div>
                  <div className="h-[16px] relative shrink-0 w-[80.68px]">
                    <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#a0a9b8] text-[12px] text-nowrap top-px whitespace-pre">Main overview</p>
                  </div>
                </div>
              </button>

              {/* Satellite Tracker */}
              <button 
                onClick={() => setCurrentSection('satellites')}
                className={`h-[48px] relative rounded-[8px] shrink-0 w-full ${currentSection === 'satellites' ? 'bg-[rgba(79,195,247,0.15)] border border-[rgba(79,195,247,0.3)] shadow-[0px_10px_15px_-3px_rgba(79,195,247,0.1),0px_4px_6px_-4px_rgba(79,195,247,0.1)]' : ''}`}
              >
                <div className="absolute left-[10px] size-[16px] top-[16px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                    <g>
                      <path d={svgPaths.p542e500} stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    </g>
                  </svg>
                </div>
                <div className="absolute content-stretch flex flex-col h-[36px] items-start left-[38px] top-[6px] w-[106.773px]">
                  <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[106.773px]">
                    <p className="absolute font-['Roboto_Mono:Medium',_sans-serif] font-medium leading-[20px] left-0 text-[#6a6a6a] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Satellite Tracker</p>
                  </div>
                  <div className="h-[16px] relative shrink-0 w-[77.641px]">
                    <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#a0a9b8] text-[12px] text-nowrap top-px whitespace-pre">Live positions</p>
                  </div>
                </div>
              </button>

              {/* Space Weather - Currently Active */}
              <button 
                onClick={() => setCurrentSection('space-weather')}
                className={`h-[48px] relative rounded-[8px] shrink-0 w-full ${currentSection === 'space-weather' ? 'bg-[rgba(79,195,247,0.15)] border border-[rgba(79,195,247,0.3)] shadow-[0px_10px_15px_-3px_rgba(79,195,247,0.1),0px_4px_6px_-4px_rgba(79,195,247,0.1)]' : ''}`}
              >
                <div className="absolute content-stretch flex flex-col h-[36px] items-start left-[38px] top-[6px] w-[105.109px]">
                  <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[100.219px]">
                    <p className="absolute font-['Roboto_Mono:Medium',_sans-serif] font-medium leading-[20px] left-0 text-[#6a6a6a] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Space Weather</p>
                  </div>
                  <div className="h-[16px] relative shrink-0 w-[105.109px]">
                    <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#a0a9b8] text-[12px] text-nowrap top-px whitespace-pre">Current conditions</p>
                  </div>
                </div>
              </button>

              {/* Alerts */}
              <button 
                onClick={() => setCurrentSection('alerts')}
                className={`h-[48px] relative rounded-[8px] shrink-0 w-full ${currentSection === 'alerts' ? 'bg-[rgba(79,195,247,0.15)] border border-[rgba(79,195,247,0.3)] shadow-[0px_10px_15px_-3px_rgba(79,195,247,0.1),0px_4px_6px_-4px_rgba(79,195,247,0.1)]' : ''}`}
              >
                <div className="absolute left-[10px] size-[16px] top-[16px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                    <g>
                      <path d={svgPaths.p2afb2200} stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      <path d="M8 6V8.66667" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      <path d="M8 11.3333H8.00667" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    </g>
                  </svg>
                </div>
                <div className="absolute content-stretch flex flex-col h-[36px] items-start left-[38px] top-[6px] w-[89.383px]">
                  <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[39.148px]">
                    <p className="absolute font-['Roboto_Mono:Medium',_sans-serif] font-medium leading-[20px] left-0 text-[#7b7b7b] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Alerts</p>
                  </div>
                  <div className="h-[16px] relative shrink-0 w-[89.383px]">
                    <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#a0a9b8] text-[12px] text-nowrap top-px whitespace-pre">Active warnings</p>
                  </div>
                </div>
              </button>

              {/* Historical Data */}
              <button 
                onClick={() => setCurrentSection('historical')}
                className={`h-[48px] relative rounded-[8px] shrink-0 w-full ${currentSection === 'historical' ? 'bg-[rgba(79,195,247,0.15)] border border-[rgba(79,195,247,0.3)] shadow-[0px_10px_15px_-3px_rgba(79,195,247,0.1),0px_4px_6px_-4px_rgba(79,195,247,0.1)]' : ''}`}
              >
                <div className="absolute left-[10px] size-[16px] top-[16px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                    <g>
                      <path d={svgPaths.p90824c0} stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      <path d="M12 11.3333V6" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      <path d="M8.66667 11.3333V3.33333" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      <path d="M5.33333 11.3333V9.33333" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    </g>
                  </svg>
                </div>
                <div className="absolute content-stretch flex flex-col h-[36px] items-start left-[38px] top-[6px] w-[97.117px]">
                  <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[97.117px]">
                    <p className="absolute font-['Roboto_Mono:Medium',_sans-serif] font-medium leading-[20px] left-0 text-[#7b7b7b] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Historical Data</p>
                  </div>
                  <div className="h-[16px] relative shrink-0 w-[65.359px]">
                    <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#a0a9b8] text-[12px] text-nowrap top-px whitespace-pre">Past events</p>
                  </div>
                </div>
              </button>

              {/* Settings */}
              <button 
                onClick={() => setCurrentSection('settings')}
                className={`h-[48px] relative rounded-[8px] shrink-0 w-full ${currentSection === 'settings' ? 'bg-[rgba(79,195,247,0.15)] border border-[rgba(79,195,247,0.3)] shadow-[0px_10px_15px_-3px_rgba(79,195,247,0.1),0px_4px_6px_-4px_rgba(79,195,247,0.1)]' : ''}`}
              >
                <div className="absolute left-[10px] size-[16px] top-[16px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                    <g>
                      <path d={svgPaths.p1624e0} stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      <path d={svgPaths.p28db2b80} stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    </g>
                  </svg>
                </div>
                <div className="absolute content-stretch flex flex-col h-[36px] items-start left-[38px] top-[6px] w-[76.914px]">
                  <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[54.938px]">
                    <p className="absolute font-['Roboto_Mono:Medium',_sans-serif] font-medium leading-[20px] left-0 text-[#7b7b7b] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Settings</p>
                  </div>
                  <div className="h-[16px] relative shrink-0 w-[76.914px]">
                    <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#a0a9b8] text-[12px] text-nowrap top-px whitespace-pre">Configuration</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="h-[49px] relative shrink-0 w-full mt-auto">
            <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(232,234,237,0.12)] border-solid inset-0 pointer-events-none" />
            <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[49px] items-start pb-0 pt-[17px] px-[16px] relative w-[287px]">
              <div className="content-stretch flex gap-[8px] h-[16px] items-center relative shrink-0 w-full">
                <div className="h-[16px] relative shrink-0 w-[118.312px]">
                  <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#a0a9b8] text-[12px] text-nowrap top-px whitespace-pre"> *Real-time monitoring</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white min-h-[calc(100vh-64px)] overflow-y-auto">
          <div className="h-full">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col min-h-full items-start pb-8 pt-[32px] px-[32px] relative w-full">
              
              {currentSection === 'space-weather' && (
                <SpaceWeatherDashboard 
                  data={spaceWeatherData} 
                  isLive={isLive} 
                  lastUpdate={lastUpdate}
                  formatTemperature={formatTemperature}
                />
              )}

              {currentSection === 'satellites' && (
                <SatelliteTracker satellites={satellites} />
              )}

              {currentSection === 'alerts' && (
                <AlertsPanel alerts={alerts} />
              )}

              {currentSection === 'dashboard' && (
                <MainDashboard 
                  spaceWeatherData={spaceWeatherData}
                  satellites={satellites}
                  alerts={alerts}
                  isLive={isLive}
                  historicalData={historicalData}
                  formatTemperature={formatTemperature}
                  formatTime={formatTime}
                  setCurrentSection={setCurrentSection}
                />
              )}

              {currentSection === 'historical' && (
                <HistoricalData historicalData={historicalData} />
              )}

              {currentSection === 'settings' && (
                <Settings settings={settings} updateSettings={updateSettings} />
              )}

              {currentSection === 'threat-details' && (
                <ThreatDetailsPanel 
                  spaceWeatherData={spaceWeatherData}
                  alerts={alerts}
                  formatTemperature={formatTemperature}
                  formatTime={formatTime}
                />
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Space Weather Dashboard Component
function SpaceWeatherDashboard({ data, isLive, lastUpdate, formatTemperature }: { data: SpaceWeatherData | null; isLive: boolean; lastUpdate: string; formatTemperature: (temp: number) => string }) {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      {/* Header */}
      <div className="box-border content-stretch flex h-[97px] items-start justify-between pb-px pt-0 px-0 relative shrink-0 w-full">
        <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(218,218,218,0.53)] border-solid inset-0 pointer-events-none" />
        
        <div className="h-[72px] relative shrink-0 w-[460.648px]">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[72px] items-start relative w-[460.648px]">
            <div className="content-stretch flex h-[36px] items-start relative shrink-0 w-full">
              <p className="basis-0 font-['Kode_Mono:Bold',_sans-serif] font-bold grow leading-[36px] min-h-px min-w-px relative shrink-0 text-[#7b7b7b] text-[30px] tracking-[-0.3545px]">Space Weather Monitor</p>
            </div>
            <div className="h-[28px] relative shrink-0 w-full">
              <p className="absolute font-['Roboto_Mono:Regular',_sans-serif] font-normal leading-[28px] left-0 text-[18px] text-gray-900 text-nowrap top-0 tracking-[-0.4395px] whitespace-pre">Current space weather conditions and environmental parameters</p>
            </div>
          </div>
        </div>

        <div className="h-[44px] relative shrink-0 w-[202.297px]">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[44px] items-start relative w-[202.297px]">
            <div className="h-[20px] relative shrink-0 w-full">
              <p className="absolute font-['Cousine:Regular',_sans-serif] leading-[20px] left-[203px] not-italic text-[14px] text-gray-900 text-right top-[-0.5px] translate-x-[-100%] w-[203px]">Last updated: {lastUpdate}{data?.dataSource && ` • ${data.dataSource}`}</p>
            </div>
            <div className="content-stretch flex gap-[8px] h-[20px] items-center justify-end relative shrink-0 w-full">
              
              <div className="h-[31px] relative shrink-0 w-[29.578px]">
                <p className={`absolute font-['Inter:Medium',_sans-serif] font-medium leading-[18px] left-[-175px] not-italic text-[14px] text-nowrap text-right top-[0.20px] tracking-[-0.1504px] translate-x-[-100%] whitespace-pre ${isLive ? 'text-green-400' : 'text-orange-400'}`}>
                  {isLive ? 'LIVE' : 'OFFLINE'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {data ? (
        <div className="w-full space-y-8">
          
          {/* Main Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            
            {/* KP Index Card with Enhanced Visual */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-blue-200 rounded-full opacity-20"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-['Kode_Mono:Bold',_sans-serif] font-bold text-gray-900 text-lg">KP Index</h3>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    data.kpIndex <= 2 ? 'bg-green-100 text-green-800' :
                    data.kpIndex <= 4 ? 'bg-yellow-100 text-yellow-800' :
                    data.kpIndex <= 6 ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {data.kpIndex <= 2 ? 'Quiet' :
                     data.kpIndex <= 4 ? 'Unsettled' :
                     data.kpIndex <= 6 ? 'Active' : 'Storm'}
                  </div>
                </div>
                <div className="text-4xl font-bold text-blue-900 mb-3">{data.kpIndex.toFixed(1)}</div>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-3">
                  <div 
                    className={`h-4 rounded-full transition-all duration-500 shadow-inner ${
                      data.kpIndex <= 2 ? 'bg-gradient-to-r from-green-400 to-green-500' :
                      data.kpIndex <= 4 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                      data.kpIndex <= 6 ? 'bg-gradient-to-r from-orange-400 to-orange-500' :
                      'bg-gradient-to-r from-red-400 to-red-500'
                    }`}
                    style={{ width: `${Math.min((data.kpIndex / 9) * 100, 100)}%` }}
                  />
                </div>
                <div className="font-['Roboto_Mono:Regular',_sans-serif] text-sm text-blue-700">
                  Scale: 0 (Quiet) - 9 (Extreme Storm)
                </div>
              </div>
            </div>

            {/* Solar Wind Speed with Enhanced Visual */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-purple-200 rounded-full opacity-20"></div>
              <div className="relative">
                <h3 className="font-['Kode_Mono:Bold',_sans-serif] font-bold text-gray-900 text-lg mb-4">Solar Wind Speed</h3>
                <div className="text-4xl font-bold text-purple-900 mb-2">{data.solarWind.speed.toFixed(0)}</div>
                <div className="font-['Roboto_Mono:Regular',_sans-serif] text-sm text-purple-700 mb-3">km/s</div>
                
                {/* Speed Gauge Visual */}
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      data.solarWind.speed <= 400 ? 'bg-gradient-to-r from-green-400 to-green-500' :
                      data.solarWind.speed <= 600 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                      data.solarWind.speed <= 800 ? 'bg-gradient-to-r from-orange-400 to-orange-500' :
                      'bg-gradient-to-r from-red-400 to-red-500'
                    }`}
                    style={{ width: `${Math.min((data.solarWind.speed / 1000) * 100, 100)}%` }}
                  />
                </div>
                <div className="font-['Roboto_Mono:Regular',_sans-serif] text-xs text-purple-600">
                  Normal: 300-800 km/s
                </div>
              </div>
            </div>

            {/* Solar Wind Density with Enhanced Visual */}
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 rounded-lg p-6 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-indigo-200 rounded-full opacity-20"></div>
              <div className="relative">
                <h3 className="font-['Kode_Mono:Bold',_sans-serif] font-bold text-gray-900 text-lg mb-4">Proton Density</h3>
                <div className="text-4xl font-bold text-indigo-900 mb-2">{data.solarWind.density.toFixed(1)}</div>
                <div className="font-['Roboto_Mono:Regular',_sans-serif] text-sm text-indigo-700 mb-3">protons/cm³</div>
                
                {/* Density dots visualization */}
                <div className="grid grid-cols-10 gap-1 mb-3">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div 
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i < Math.min(data.solarWind.density, 20) ? 'bg-indigo-500' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <div className="font-['Roboto_Mono:Regular',_sans-serif] text-xs text-indigo-600">
                  Normal: 1-10 p/cm³
                </div>
              </div>
            </div>

            {/* Solar Wind Temperature with Enhanced Visual */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-6 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-orange-200 rounded-full opacity-20"></div>
              <div className="relative">
                <h3 className="font-['Kode_Mono:Bold',_sans-serif] font-bold text-gray-900 text-lg mb-4">Temperature</h3>
                <div className="text-4xl font-bold text-orange-900 mb-2">{formatTemperature(data.solarWind.temperature)}</div>
                <div className="font-['Roboto_Mono:Regular',_sans-serif] text-sm text-orange-700 mb-3">Solar Wind</div>
                
                {/* Temperature thermometer visual */}
                <div className="flex items-end gap-1 h-12 mb-2">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div 
                      key={i}
                      className={`w-3 rounded-t transition-all duration-300 ${
                        i < Math.min((data.solarWind.temperature / 100000) * 8, 8) ? 'bg-gradient-to-t from-orange-500 to-red-400' : 'bg-gray-200'
                      }`}
                      style={{ height: `${20 + i * 4}px` }}
                    />
                  ))}
                </div>
                <div className="font-['Roboto_Mono:Regular',_sans-serif] text-xs text-orange-600">
                  Normal: 10-100K × 10³
                </div>
              </div>
            </div>

            {/* Geomagnetic Activity with Enhanced Visual */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-lg p-6 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-emerald-200 rounded-full opacity-20"></div>
              <div className="relative">
                <h3 className="font-['Kode_Mono:Bold',_sans-serif] font-bold text-gray-900 text-lg mb-4">Geomagnetic Activity</h3>
                <div className="text-3xl font-bold text-emerald-900 mb-3">{data.geomagneticActivity}</div>
                
                {/* Activity indicator */}
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-4 h-4 rounded-full animate-pulse ${
                    data.geomagneticActivity === 'Storm' ? 'bg-red-500' :
                    data.geomagneticActivity === 'Active' ? 'bg-orange-500' :
                    data.geomagneticActivity === 'Unsettled' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}></div>
                  <span className="font-['Roboto_Mono:Regular',_sans-serif] text-sm text-emerald-700">Current State</span>
                </div>
                <div className="font-['Roboto_Mono:Regular',_sans-serif] text-xs text-emerald-600">
                  Based on planetary K-index
                </div>
              </div>
            </div>

            {/* X-Ray Flux with Enhanced Visual */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-lg p-6 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-red-200 rounded-full opacity-20"></div>
              <div className="relative">
                <h3 className="font-['Kode_Mono:Bold',_sans-serif] font-bold text-gray-900 text-lg mb-4">X-Ray Flux</h3>
                <div className="text-3xl font-bold text-red-900 mb-2">{data.solarActivity.xrayFlux}</div>
                <div className="font-['Roboto_Mono:Regular',_sans-serif] text-sm text-red-700 mb-3">Class Level</div>
                
                {/* X-ray intensity bars */}
                <div className="flex items-end gap-1 h-8 mb-3">
                  {['A', 'B', 'C', 'M', 'X'].map((cls, i) => (
                    <div key={cls} className="flex flex-col items-center gap-1">
                      <div 
                        className={`w-4 rounded transition-all duration-300 ${
                          data.solarActivity.xrayFlux.charAt(0) === cls ? 'bg-gradient-to-t from-red-500 to-yellow-400' : 'bg-gray-200'
                        }`}
                        style={{ height: `${8 + i * 4}px` }}
                      />
                      <span className="font-['Roboto_Mono:Regular',_sans-serif] text-xs text-red-600">{cls}</span>
                    </div>
                  ))}
                </div>
                <div className="font-['Roboto_Mono:Regular',_sans-serif] text-xs text-red-600">
                  Flares today: {data.solarActivity.solarFlares}
                </div>
              </div>
            </div>
          </div>

          {/* Solar Activity Overview */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
            <h3 className="font-['Kode_Mono:Bold',_sans-serif] font-bold text-gray-900 text-xl mb-6">Solar Activity Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="text-3xl font-bold text-yellow-700 mb-2">{data.solarActivity.sunspotNumber}</div>
                <div className="font-['Roboto_Mono:Regular',_sans-serif] text-sm text-yellow-600">Sunspot Number</div>
                <div className="mt-2 w-full bg-yellow-200 rounded-full h-2">
                  <div 
                    className="h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((data.solarActivity.sunspotNumber / 200) * 100, 100)}%` }}
                  />
                </div>
              </div>
              
              <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="text-3xl font-bold text-red-700 mb-2">{data.solarActivity.solarFlares}</div>
                <div className="font-['Roboto_Mono:Regular',_sans-serif] text-sm text-red-600">Solar Flares (24h)</div>
                <div className="mt-2 flex justify-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div 
                      key={i}
                      className={`w-2 h-6 rounded transition-all duration-300 ${
                        i < data.solarActivity.solarFlares ? 'bg-gradient-to-t from-red-500 to-orange-400' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="text-2xl font-bold text-purple-700 mb-2">{data.solarActivity.xrayFlux.charAt(0)}-Class</div>
                <div className="font-['Roboto_Mono:Regular',_sans-serif] text-sm text-purple-600">Current X-Ray Level</div>
                <div className="mt-2 flex justify-center">
                  <div className={`w-8 h-8 rounded-full border-4 ${
                    data.solarActivity.xrayFlux.charAt(0) === 'X' ? 'bg-red-500 border-red-300 animate-pulse' :
                    data.solarActivity.xrayFlux.charAt(0) === 'M' ? 'bg-orange-500 border-orange-300' :
                    data.solarActivity.xrayFlux.charAt(0) === 'C' ? 'bg-yellow-500 border-yellow-300' :
                    'bg-blue-500 border-blue-300'
                  }`}></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      ) : (
        <div className="flex items-center justify-center h-64 w-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading space weather data...</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Satellite Tracker Component
function SatelliteTracker({ satellites }: { satellites: SatelliteData[] }) {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <div className="box-border content-stretch flex h-[97px] items-start justify-between pb-px pt-0 px-0 relative shrink-0 w-full">
        <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(218,218,218,0.53)] border-solid inset-0 pointer-events-none" />
        
        <div className="h-[72px] relative shrink-0 w-[460.648px]">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[72px] items-start relative w-[460.648px]">
            <div className="content-stretch flex h-[36px] items-start relative shrink-0 w-full">
              <p className="basis-0 font-['Kode_Mono:Bold',_sans-serif] font-bold grow leading-[36px] min-h-px min-w-px relative shrink-0 text-[#7b7b7b] text-[30px] tracking-[-0.3545px]">Satellite Tracker</p>
            </div>
            <div className="h-[28px] relative shrink-0 w-full">
              <p className="absolute font-['Roboto_Mono:Regular',_sans-serif] font-normal leading-[28px] left-0 text-[18px] text-gray-900 text-nowrap top-0 tracking-[-0.4395px] whitespace-pre">Live satellite positions and orbital data</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full space-y-4 flex-1">
        {satellites.length > 0 ? (
          satellites.filter(sat => sat && sat.name).map((satellite) => (
            <div key={satellite.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <h3 className="font-['Roboto_Mono:Medium',_sans-serif] font-medium text-gray-900 text-lg mb-2">{satellite.name}</h3>
                  <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                    satellite.status === 'operational' ? 'bg-green-100 text-green-800' :
                    satellite.status === 'degraded' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {satellite.status.charAt(0).toUpperCase() + satellite.status.slice(1)}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 mb-1">Latitude</div>
                  <div className="font-mono text-lg text-gray-900">{satellite.position?.lat?.toFixed(4) || '0.0000'}°</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 mb-1">Longitude</div>
                  <div className="font-mono text-lg text-gray-900">{satellite.position?.lng?.toFixed(4) || '0.0000'}°</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 mb-1">Altitude</div>
                  <div className="font-mono text-lg text-gray-900">{satellite.position?.alt?.toFixed(0) || '0'} km</div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-600">Velocity: </span>
                    <span className="font-mono text-gray-900">{satellite.velocity?.toFixed(2) || '0.00'} km/s</span>
                  </div>
                  <div className="text-sm text-gray-500">ID: {satellite.id}</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-64 w-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading satellite data...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Alerts Panel Component
function AlertsPanel({ alerts }: { alerts: AlertData[] }) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'extreme': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <div className="box-border content-stretch flex h-[97px] items-start justify-between pb-px pt-0 px-0 relative shrink-0 w-full">
        <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(218,218,218,0.53)] border-solid inset-0 pointer-events-none" />
        
        <div className="h-[72px] relative shrink-0 w-[460.648px]">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[72px] items-start relative w-[460.648px]">
            <div className="content-stretch flex h-[36px] items-start relative shrink-0 w-full">
              <p className="basis-0 font-['Kode_Mono:Bold',_sans-serif] font-bold grow leading-[36px] min-h-px min-w-px relative shrink-0 text-[#7b7b7b] text-[30px] tracking-[-0.3545px]">Active Alerts</p>
            </div>
            <div className="h-[28px] relative shrink-0 w-full">
              <p className="absolute font-['Roboto_Mono:Regular',_sans-serif] font-normal leading-[28px] left-0 text-[18px] text-gray-900 text-nowrap top-0 tracking-[-0.4395px] whitespace-pre">Current space weather warnings and notifications</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full space-y-4 flex-1">
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <div key={alert.id} className={`border-l-4 rounded-lg p-6 shadow-sm ${getSeverityColor(alert.severity)}`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-['Roboto_Mono:Medium',_sans-serif] font-medium text-lg mb-1">{alert.type}</h3>
                  <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(alert.severity)}`}>
                    {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)} Severity
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {new Date(alert.timestamp).toLocaleString()}
                </div>
              </div>
              
              <p className="text-gray-800 mb-4">{alert.message}</p>
              
              <div className="flex justify-between items-center">
                <div className={`inline-flex px-2 py-1 rounded text-sm ${
                  alert.active ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'
                }`}>
                  {alert.active ? 'ACTIVE' : 'RESOLVED'}
                </div>
                <div className="text-sm text-gray-500">Alert ID: {alert.id}{alert.source && ` • Source: ${alert.source}`}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-64 w-full">
            <div className="text-center">
              <div className="text-green-600 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-gray-600 text-lg">No active alerts</p>
              <p className="text-gray-500 text-sm mt-2">All space weather conditions are nominal</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Main Dashboard Component
function MainDashboard({ spaceWeatherData, satellites, alerts, isLive, historicalData, formatTemperature, formatTime, setCurrentSection }: { 
  spaceWeatherData: SpaceWeatherData | null; 
  satellites: SatelliteData[]; 
  alerts: AlertData[]; 
  isLive: boolean;
  historicalData: HistoricalDataPoint[];
  formatTemperature: (temp: number) => string;
  formatTime: (timestamp: string) => string;
  setCurrentSection: (section: string) => void;
}) {
  const activeAlerts = alerts.filter(alert => alert.active);
  const criticalAlerts = activeAlerts.filter(alert => alert.severity === 'high' || alert.severity === 'extreme');
  const operationalSatellites = satellites.filter(sat => sat.status === 'operational');
  
  // Calculate threat level based on space weather conditions
  const getThreatLevel = () => {
    if (!spaceWeatherData) return { level: 'unknown', color: 'gray', description: 'Data loading...' };
    
    const kp = spaceWeatherData.kpIndex;
    const solarWind = spaceWeatherData.solarWind.speed;
    const xrayClass = spaceWeatherData.solarActivity.xrayFlux.charAt(0);
    
    if (kp >= 7 || solarWind > 800 || xrayClass === 'X') {
      return { level: 'EXTREME', color: 'red', description: 'Severe space weather conditions' };
    } else if (kp >= 5 || solarWind > 600 || xrayClass === 'M') {
      return { level: 'HIGH', color: 'orange', description: 'Active space weather conditions' };
    } else if (kp >= 3 || solarWind > 500 || xrayClass === 'C') {
      return { level: 'MODERATE', color: 'yellow', description: 'Elevated space weather activity' };
    } else {
      return { level: 'LOW', color: 'green', description: 'Quiet space weather conditions' };
    }
  };

  const threatLevel = getThreatLevel();
  
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <div className="box-border content-stretch flex h-[97px] items-start justify-between pb-px pt-0 px-0 relative shrink-0 w-full">
        <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(218,218,218,0.53)] border-solid inset-0 pointer-events-none" />
        
        <div className="h-[72px] relative shrink-0 w-[460.648px]">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[72px] items-start relative w-[460.648px]">
            <div className="content-stretch flex h-[36px] items-start relative shrink-0 w-full">
              <p className="basis-0 font-['Kode_Mono:Bold',_sans-serif] font-bold grow leading-[36px] min-h-px min-w-px relative shrink-0 text-[#7b7b7b] text-[30px] tracking-[-0.3545px]">Mission Control Dashboard</p>
            </div>
            <div className="h-[28px] relative shrink-0 w-full">
              <p className="absolute font-['Roboto_Mono:Regular',_sans-serif] font-normal leading-[28px] left-0 text-[18px] text-gray-900 text-nowrap top-0 tracking-[-0.4395px] whitespace-pre">Real-time space environment monitoring and threat assessment</p>
            </div>
          </div>
        </div>

        <div className="h-[44px] relative shrink-0 w-[202.297px]">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[44px] items-start relative w-[202.297px]">
            <div className="h-[20px] relative shrink-0 w-full">
              <p className="absolute font-['Cousine:Regular',_sans-serif] leading-[20px] left-[203px] not-italic text-[14px] text-gray-900 text-right top-[-0.5px] translate-x-[-100%] w-[203px]">Threat Level: {threatLevel.level}</p>
            </div>
      
          </div>
        </div>
      </div>

      {/* Critical Alerts Banner */}
      {criticalAlerts.length > 0 && (
        <div className="w-full bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800">
                <span className="font-medium">Critical Alert:</span> {criticalAlerts.length} high-priority space weather event{criticalAlerts.length > 1 ? 's' : ''} detected. 
                <button 
                  onClick={() => setCurrentSection('threat-details')}
                  className="ml-2 underline hover:no-underline"
                >
                  View Details
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Primary Status Overview */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Mission Status Summary */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-lg p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-['Kode_Mono:Bold',_sans-serif] font-bold text-gray-900 text-xl">Mission Status</h3>
            <div className={`w-4 h-4 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${isLive ? 'text-green-600' : 'text-red-600'}`}>
                {isLive ? 'ONLINE' : 'OFFLINE'}
              </div>
              <div className="font-['Roboto_Mono:Regular',_sans-serif] text-sm text-gray-600">System Status</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {operationalSatellites.length}/{satellites.length}
              </div>
              <div className="font-['Roboto_Mono:Regular',_sans-serif] text-sm text-gray-600">Satellites Active</div>
            </div>
            
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${activeAlerts.length > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {activeAlerts.length}
              </div>
              <div className="font-['Roboto_Mono:Regular',_sans-serif] text-sm text-gray-600">Active Alerts</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">98.7%</div>
              <div className="font-['Roboto_Mono:Regular',_sans-serif] text-sm text-gray-600">Data Quality</div>
            </div>
          </div>
        </div>

        {/* Threat Assessment */}
        <div className={`bg-gradient-to-br border rounded-lg p-8 shadow-lg ${
          threatLevel.color === 'red' ? 'from-red-50 to-red-100 border-red-200' :
          threatLevel.color === 'orange' ? 'from-orange-50 to-orange-100 border-orange-200' :
          threatLevel.color === 'yellow' ? 'from-yellow-50 to-yellow-100 border-yellow-200' :
          'from-green-50 to-green-100 border-green-200'
        }`}>
          <h3 className="font-['Kode_Mono:Bold',_sans-serif] font-bold text-gray-900 text-xl mb-6">Threat Assessment</h3>
          
          <div className="text-center">
            <div className={`text-6xl font-bold mb-4 ${
              threatLevel.color === 'red' ? 'text-red-600' :
              threatLevel.color === 'orange' ? 'text-orange-600' :
              threatLevel.color === 'yellow' ? 'text-yellow-600' :
              'text-green-600'
            }`}>{threatLevel.level}</div>
            
            <div className={`inline-flex px-4 py-2 rounded-full text-lg font-medium mb-4 ${
              threatLevel.color === 'red' ? 'bg-red-100 text-red-800' :
              threatLevel.color === 'orange' ? 'bg-orange-100 text-orange-800' :
              threatLevel.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {threatLevel.description}
            </div>
            
            <div className="font-['Roboto_Mono:Regular',_sans-serif] text-sm text-gray-600">
              Assessment based on KP index, solar wind speed, and X-ray flux levels
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      {spaceWeatherData && (
        <div className="w-full mb-8">
          <h3 className="font-['Kode_Mono:Bold',_sans-serif] font-bold text-gray-900 text-xl mb-6">Key Space Weather Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* KP Index */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-['Kode_Mono:Medium',_sans-serif] font-medium text-gray-900 text-lg">KP Index</h4>
                <div className="font-['Roboto_Mono:Regular',_sans-serif] text-xs text-gray-500">3-hour avg</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-3">{spaceWeatherData.kpIndex.toFixed(1)}</div>
                <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                  spaceWeatherData.kpIndex <= 2 ? 'bg-green-100 text-green-800' :
                  spaceWeatherData.kpIndex <= 4 ? 'bg-yellow-100 text-yellow-800' :
                  spaceWeatherData.kpIndex <= 6 ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {spaceWeatherData.kpIndex <= 2 ? 'Quiet' :
                   spaceWeatherData.kpIndex <= 4 ? 'Unsettled' :
                   spaceWeatherData.kpIndex <= 6 ? 'Active' : 'Storm'}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      spaceWeatherData.kpIndex <= 2 ? 'bg-green-500' :
                      spaceWeatherData.kpIndex <= 4 ? 'bg-yellow-500' :
                      spaceWeatherData.kpIndex <= 6 ? 'bg-orange-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${Math.min((spaceWeatherData.kpIndex / 9) * 100, 100)}%` }}
                  />
                </div>
                <div className="font-['Roboto_Mono:Regular',_sans-serif] text-xs text-gray-600">
                  Scale: 0 (Quiet) → 9 (Extreme Storm)
                </div>
              </div>
            </div>

            {/* Solar Wind Speed */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h4 className="font-['Kode_Mono:Medium',_sans-serif] font-medium text-gray-900 text-lg mb-4">Solar Wind Speed</h4>
              <div className="text-center">
                <div className="text-5xl font-bold text-purple-600 mb-3">{spaceWeatherData.solarWind.speed.toFixed(0)}</div>
                <div className="font-['Roboto_Mono:Regular',_sans-serif] text-lg text-gray-600 mb-4">km/s</div>
                <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                  spaceWeatherData.solarWind.speed > 600 ? 'bg-red-100 text-red-700' :
                  spaceWeatherData.solarWind.speed > 500 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {spaceWeatherData.solarWind.speed > 600 ? 'HIGH SPEED' :
                   spaceWeatherData.solarWind.speed > 500 ? 'ELEVATED' : 'NORMAL'}
                </div>
                <div className="mt-3 font-['Roboto_Mono:Regular',_sans-serif] text-xs text-gray-600">
                  Normal: 300-500 km/s
                </div>
              </div>
            </div>

            {/* X-Ray Activity */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h4 className="font-['Kode_Mono:Medium',_sans-serif] font-medium text-gray-900 text-lg mb-4">X-Ray Activity</h4>
              <div className="text-center">
                <div className="text-5xl font-bold text-red-600 mb-3">{spaceWeatherData.solarActivity.xrayFlux}</div>
                <div className="font-['Roboto_Mono:Regular',_sans-serif] text-lg text-gray-600 mb-4">Class Level</div>
                <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                  spaceWeatherData.solarActivity.xrayFlux.charAt(0) === 'X' ? 'bg-red-100 text-red-700' :
                  spaceWeatherData.solarActivity.xrayFlux.charAt(0) === 'M' ? 'bg-orange-100 text-orange-700' :
                  spaceWeatherData.solarActivity.xrayFlux.charAt(0) === 'C' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {spaceWeatherData.solarActivity.xrayFlux.charAt(0) === 'X' ? 'EXTREME' :
                   spaceWeatherData.solarActivity.xrayFlux.charAt(0) === 'M' ? 'STRONG' :
                   spaceWeatherData.solarActivity.xrayFlux.charAt(0) === 'C' ? 'MODERATE' : 'WEAK'}
                </div>
                <div className="mt-3 font-['Roboto_Mono:Regular',_sans-serif] text-xs text-gray-600">
                  Solar flares today: {spaceWeatherData.solarActivity.solarFlares}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alerts and Operations Row */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Alerts */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="font-['Kode_Mono:Bold',_sans-serif] font-bold text-gray-900 text-lg mb-6">Priority Alerts</h3>
          {activeAlerts.length > 0 ? (
            <div className="space-y-4">
              {activeAlerts.slice(0, 4).map((alert) => (
                <div key={alert.id} className={`border-l-4 pl-4 py-3 rounded-r-lg ${
                  alert.severity === 'extreme' ? 'border-red-500 bg-red-50' :
                  alert.severity === 'high' ? 'border-orange-500 bg-orange-50' :
                  alert.severity === 'moderate' ? 'border-yellow-500 bg-yellow-50' :
                  'border-blue-500 bg-blue-50'
                }`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-['Kode_Mono:Medium',_sans-serif] font-medium text-gray-900">{alert.type}</div>
                      <div className="font-['Roboto_Mono:Regular',_sans-serif] text-xs text-gray-600 mt-1">{alert.message}</div>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded font-medium ${
                      alert.severity === 'extreme' ? 'bg-red-100 text-red-700' :
                      alert.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                      alert.severity === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {alert.severity.toUpperCase()}
                    </div>
                  </div>
                  <div className="font-['Roboto_Mono:Regular',_sans-serif] text-xs text-gray-500 mt-2">
                    {formatTime(alert.timestamp)}
                  </div>
                </div>
              ))}
              {activeAlerts.length > 4 && (
                <div className="text-center pt-3 border-t border-gray-200">
                  <button 
                    onClick={() => setCurrentSection('alerts')}
                    className="font-['Roboto_Mono:Medium',_sans-serif] text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    View {activeAlerts.length - 4} more alerts →
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-green-600 mb-3">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="font-['Roboto_Mono:Regular',_sans-serif] text-lg text-gray-600">All Systems Nominal</p>
              <p className="font-['Roboto_Mono:Regular',_sans-serif] text-sm text-gray-500 mt-1">No active space weather alerts</p>
            </div>
          )}
        </div>

        {/* Satellite Operations */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="font-['Kode_Mono:Bold',_sans-serif] font-bold text-gray-900 text-lg mb-6">Satellite Operations</h3>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-1">{operationalSatellites.length}</div>
              <div className="font-['Roboto_Mono:Regular',_sans-serif] text-sm text-green-700">Operational</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="text-3xl font-bold text-yellow-600 mb-1">{satellites.filter(s => s.status === 'degraded').length}</div>
              <div className="font-['Roboto_Mono:Regular',_sans-serif] text-sm text-yellow-700">Degraded</div>
            </div>
            <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="text-3xl font-bold text-red-600 mb-1">{satellites.filter(s => s.status === 'offline').length}</div>
              <div className="font-['Roboto_Mono:Regular',_sans-serif] text-sm text-red-700">Offline</div>
            </div>
          </div>
          
          <div className="space-y-3">
            {satellites.slice(0, 3).map((satellite) => (
              <div key={satellite.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-['Kode_Mono:Medium',_sans-serif] font-medium text-gray-900">{satellite.name}</div>
                  <div className="font-['Roboto_Mono:Regular',_sans-serif] text-sm text-gray-600">
                    Alt: {satellite.position?.alt?.toFixed(0) || '0'} km | Vel: {satellite.velocity?.toFixed(1) || '0.0'} km/s
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  satellite.status === 'operational' ? 'bg-green-100 text-green-800' :
                  satellite.status === 'degraded' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {satellite.status.toUpperCase()}
                </div>
              </div>
            ))}
            {satellites.length > 3 && (
              <div className="text-center pt-2">
                <button 
                  onClick={() => setCurrentSection('satellites')}
                  className="font-['Roboto_Mono:Medium',_sans-serif] text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  View all {satellites.length} satellites →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Real-time Environmental Data */}
      {spaceWeatherData && (
        <div className="w-full pb-8">
          <h3 className="font-['Roboto_Mono:Medium',_sans-serif] font-medium text-gray-900 text-xl mb-6">Environmental Conditions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-200 rounded-full opacity-20"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-blue-600 text-sm font-medium">Solar Wind Speed</div>
                  <div className={`text-xs px-2 py-1 rounded ${
                    spaceWeatherData.solarWind.speed > 600 ? 'bg-red-100 text-red-700' :
                    spaceWeatherData.solarWind.speed > 500 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {spaceWeatherData.solarWind.speed > 600 ? 'HIGH' :
                     spaceWeatherData.solarWind.speed > 500 ? 'ELEVATED' : 'NORMAL'}
                  </div>
                </div>
                <div className="text-3xl font-bold text-blue-900 mb-1">{spaceWeatherData.solarWind.speed.toFixed(0)}</div>
                <div className="text-sm text-blue-700">km/s</div>
                <div className="mt-3 text-xs text-blue-600">
                  Normal: 300-500 km/s
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-purple-200 rounded-full opacity-20"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-purple-600 text-sm font-medium">Proton Density</div>
                  <div className={`text-xs px-2 py-1 rounded ${
                    spaceWeatherData.solarWind.density > 15 ? 'bg-red-100 text-red-700' :
                    spaceWeatherData.solarWind.density > 10 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {spaceWeatherData.solarWind.density > 15 ? 'HIGH' :
                     spaceWeatherData.solarWind.density > 10 ? 'ELEVATED' : 'NORMAL'}
                  </div>
                </div>
                <div className="text-3xl font-bold text-purple-900 mb-1">{spaceWeatherData.solarWind.density.toFixed(1)}</div>
                <div className="text-sm text-purple-700">p/cm³</div>
                <div className="mt-3 text-xs text-purple-600">
                  Normal: 1-10 p/cm³
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-orange-200 rounded-full opacity-20"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-orange-600 text-sm font-medium">Temperature</div>
                  <div className={`text-xs px-2 py-1 rounded ${
                    spaceWeatherData.solarWind.temperature > 80000 ? 'bg-red-100 text-red-700' :
                    spaceWeatherData.solarWind.temperature > 50000 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {spaceWeatherData.solarWind.temperature > 80000 ? 'HIGH' :
                     spaceWeatherData.solarWind.temperature > 50000 ? 'ELEVATED' : 'NORMAL'}
                  </div>
                </div>
                <div className="text-3xl font-bold text-orange-900 mb-1">{formatTemperature(spaceWeatherData.solarWind.temperature)}</div>
                <div className="text-sm text-orange-700">Temperature</div>
                <div className="mt-3 text-xs text-orange-600">
                  Normal: 10-100K × 10³
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-lg p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-red-200 rounded-full opacity-20"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-red-600 text-sm font-medium">X-Ray Flux</div>
                  <div className={`text-xs px-2 py-1 rounded ${
                    spaceWeatherData.solarActivity.xrayFlux.charAt(0) === 'X' ? 'bg-red-100 text-red-700' :
                    spaceWeatherData.solarActivity.xrayFlux.charAt(0) === 'M' ? 'bg-orange-100 text-orange-700' :
                    spaceWeatherData.solarActivity.xrayFlux.charAt(0) === 'C' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {spaceWeatherData.solarActivity.xrayFlux.charAt(0) === 'X' ? 'EXTREME' :
                     spaceWeatherData.solarActivity.xrayFlux.charAt(0) === 'M' ? 'STRONG' :
                     spaceWeatherData.solarActivity.xrayFlux.charAt(0) === 'C' ? 'MODERATE' : 'WEAK'}
                  </div>
                </div>
                <div className="text-3xl font-bold text-red-900 mb-1">{spaceWeatherData.solarActivity.xrayFlux}</div>
                <div className="text-sm text-red-700">Class</div>
                <div className="mt-3 text-xs text-red-600">
                  Flares today: {spaceWeatherData.solarActivity.solarFlares}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Satellite Operations Overview */}
      <div className="w-full pb-8">
        <h3 className="font-['Roboto_Mono:Medium',_sans-serif] font-medium text-gray-900 text-xl mb-6">Satellite Operations</h3>
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{operationalSatellites.length}</div>
              <div className="text-sm text-gray-600">Operational</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">{satellites.filter(s => s.status === 'degraded').length}</div>
              <div className="text-sm text-gray-600">Degraded</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">{satellites.filter(s => s.status === 'offline').length}</div>
              <div className="text-sm text-gray-600">Offline</div>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {satellites.slice(0, 4).map((satellite) => (
              <div key={satellite.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{satellite.name}</div>
                  <div className="text-sm text-gray-600">Alt: {satellite.position?.alt?.toFixed(0) || '0'} km</div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  satellite.status === 'operational' ? 'bg-green-100 text-green-800' :
                  satellite.status === 'degraded' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {satellite.status.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Historical Data Component
function HistoricalData({ historicalData }: { historicalData: HistoricalDataPoint[] }) {
  const [selectedTimeRange, setSelectedTimeRange] = React.useState('7d');
  const [selectedMetric, setSelectedMetric] = React.useState('kpIndex');
  const [filteredData, setFilteredData] = React.useState<HistoricalDataPoint[]>([]);

  // Filter data based on selected time range
  React.useEffect(() => {
    if (!historicalData.length) return;

    const now = new Date();
    let startDate: Date;

    switch (selectedTimeRange) {
      case '24h':
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '1y':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    const filtered = historicalData.filter(point => new Date(point.timestamp) >= startDate);
    setFilteredData(filtered);
  }, [historicalData, selectedTimeRange]);

  // Fetch new data when time range changes
  const handleTimeRangeChange = async (newRange: string) => {
    setSelectedTimeRange(newRange);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-378d778b/historical?range=${newRange}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        // Update will happen through useEffect when historicalData changes
      } else {
        console.error('Historical data API returned error:', response.status);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error('Historical data range fetch timed out');
      } else {
        console.error('Error fetching historical data for range:', error);
      }
    }
  };
  
  // Enhanced line chart component with axes
  const EnhancedLineChart = ({ data, metric, color, title }: { data: HistoricalDataPoint[], metric: keyof HistoricalDataPoint, color: string, title: string }) => {
    if (!data.length) return null;
    
    const values = data.map(d => typeof d[metric] === 'number' ? d[metric] as number : 0);
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    const range = maxValue - minValue || 1;
    
    // Chart dimensions with margins for axes
    const chartWidth = 400;
    const chartHeight = 200;
    const marginLeft = 60;
    const marginBottom = 40;
    const marginTop = 20;
    const marginRight = 20;
    const plotWidth = chartWidth - marginLeft - marginRight;
    const plotHeight = chartHeight - marginTop - marginBottom;
    
    const points = data.map((point, index) => {
      const x = marginLeft + (index / (data.length - 1)) * plotWidth;
      const y = marginTop + plotHeight - ((values[index] - minValue) / range) * plotHeight;
      return `${x},${y}`;
    }).join(' ');

    // Generate tick marks
    const yTicks = [];
    const tickCount = 5;
    for (let i = 0; i <= tickCount; i++) {
      const value = minValue + (range * i / tickCount);
      const y = marginTop + plotHeight - (i / tickCount) * plotHeight;
      yTicks.push({ value, y });
    }

    const xTicks = [];
    const xTickCount = Math.min(6, data.length);
    for (let i = 0; i < xTickCount; i++) {
      const index = Math.floor((i / (xTickCount - 1)) * (data.length - 1));
      const x = marginLeft + (i / (xTickCount - 1)) * plotWidth;
      const date = new Date(data[index].timestamp);
      xTicks.push({ 
        label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), 
        x 
      });
    }
    
    return (
      <div className="w-full">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-64 border border-gray-200 rounded bg-white">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect x={marginLeft} y={marginTop} width={plotWidth} height={plotHeight} fill="url(#grid)" />
          
          {/* Y-axis */}
          <line x1={marginLeft} y1={marginTop} x2={marginLeft} y2={marginTop + plotHeight} stroke="#6b7280" strokeWidth="2"/>
          
          {/* X-axis */}
          <line x1={marginLeft} y1={marginTop + plotHeight} x2={marginLeft + plotWidth} y2={marginTop + plotHeight} stroke="#6b7280" strokeWidth="2"/>
          
          {/* Y-axis ticks and labels */}
          {yTicks.map((tick, i) => (
            <g key={i}>
              <line x1={marginLeft - 5} y1={tick.y} x2={marginLeft} y2={tick.y} stroke="#6b7280" strokeWidth="1"/>
              <text x={marginLeft - 10} y={tick.y + 4} textAnchor="end" className="fill-gray-600 text-xs font-['Roboto_Mono:Regular',_sans-serif]">
                {metric === 'kpIndex' ? tick.value.toFixed(1) :
                 metric === 'solarWindSpeed' ? Math.round(tick.value) :
                 metric === 'alerts' ? Math.round(tick.value) :
                 Math.round(tick.value)}
              </text>
            </g>
          ))}
          
          {/* X-axis ticks and labels */}
          {xTicks.map((tick, i) => (
            <g key={i}>
              <line x1={tick.x} y1={marginTop + plotHeight} x2={tick.x} y2={marginTop + plotHeight + 5} stroke="#6b7280" strokeWidth="1"/>
              <text x={tick.x} y={marginTop + plotHeight + 20} textAnchor="middle" className="fill-gray-600 text-xs font-['Roboto_Mono:Regular',_sans-serif]">
                {tick.label}
              </text>
            </g>
          ))}
          
          {/* Data line */}
          <polyline
            fill="none"
            stroke={color}
            strokeWidth="3"
            points={points}
            className="drop-shadow-sm"
          />
          
          {/* Data points */}
          {data.map((point, index) => {
            const x = marginLeft + (index / (data.length - 1)) * plotWidth;
            const y = marginTop + plotHeight - ((values[index] - minValue) / range) * plotHeight;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill={color}
                className="opacity-80 hover:opacity-100 cursor-pointer"
                stroke="white"
                strokeWidth="2"
              >
                <title>{`${title}: ${values[index]} (${new Date(point.timestamp).toLocaleDateString()})`}</title>
              </circle>
            );
          })}
          
          {/* Y-axis label */}
          <text 
            x="20" 
            y={marginTop + plotHeight / 2} 
            textAnchor="middle" 
            transform={`rotate(-90, 20, ${marginTop + plotHeight / 2})`}
            className="fill-gray-700 text-sm font-['Kode_Mono:Medium',_sans-serif]"
          >
            {metric === 'kpIndex' ? 'KP Index' :
             metric === 'solarWindSpeed' ? 'Speed (km/s)' :
             metric === 'xrayFlux' ? 'X-Ray Class' :
             'Alert Count'}
          </text>
          
          {/* X-axis label */}
          <text 
            x={marginLeft + plotWidth / 2} 
            y={chartHeight - 5} 
            textAnchor="middle"
            className="fill-gray-700 text-sm font-['Kode_Mono:Medium',_sans-serif]"
          >
            Date
          </text>
        </svg>
      </div>
    );
  };

  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <div className="box-border content-stretch flex h-[97px] items-start justify-between pb-px pt-0 px-0 relative shrink-0 w-full">
        <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(218,218,218,0.53)] border-solid inset-0 pointer-events-none" />
        
        <div className="h-[72px] relative shrink-0 w-[460.648px]">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[72px] items-start relative w-[460.648px]">
            <div className="content-stretch flex h-[36px] items-start relative shrink-0 w-full">
              <p className="basis-0 font-['Kode_Mono:Bold',_sans-serif] font-bold grow leading-[36px] min-h-px min-w-px relative shrink-0 text-[#7b7b7b] text-[30px] tracking-[-0.3545px]">Historical Data</p>
            </div>
            <div className="h-[28px] relative shrink-0 w-full">
              <p className="absolute font-['Roboto_Mono:Regular',_sans-serif] font-normal leading-[28px] left-0 text-[18px] text-gray-900 text-nowrap top-0 tracking-[-0.4395px] whitespace-pre">Space weather trends and historical analysis</p>
            </div>
          </div>
        </div>

        <div className="h-[44px] relative shrink-0 w-[202.297px]">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[44px] items-start relative w-[202.297px]">
            <div className="flex gap-2">
              <select 
                value={selectedTimeRange}
                onChange={(e) => handleTimeRangeChange(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-sm font-['Roboto_Mono:Regular',_sans-serif]"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="1y">Last Year</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {historicalData.length > 0 ? (
        <div className="w-full space-y-6 pb-8">
          {/* Metric Selection */}
          <div className="flex gap-4 mb-6">
            {[
              { key: 'kpIndex', label: 'KP Index', color: '#3B82F6' },
              { key: 'solarWindSpeed', label: 'Solar Wind Speed', color: '#8B5CF6' },
              { key: 'xrayFlux', label: 'X-Ray Flux', color: '#EF4444' },
              { key: 'alerts', label: 'Alert Count', color: '#F59E0B' }
            ].map((metric) => (
              <button
                key={metric.key}
                onClick={() => setSelectedMetric(metric.key)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedMetric === metric.key
                    ? 'bg-blue-100 text-blue-800 border border-blue-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {metric.label}
              </button>
            ))}
          </div>

          {/* Main Chart */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-['Roboto_Mono:Medium',_sans-serif] font-medium text-gray-900 text-lg">
                {selectedMetric === 'kpIndex' ? 'KP Index Trend' :
                 selectedMetric === 'solarWindSpeed' ? 'Solar Wind Speed Trend' :
                 selectedMetric === 'xrayFlux' ? 'X-Ray Flux Activity' : 'Alert Frequency'}
              </h3>
              <div className="text-sm text-gray-600">{selectedTimeRange}</div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <EnhancedLineChart 
                data={filteredData}
                metric={selectedMetric as keyof HistoricalDataPoint}
                title={selectedMetric === 'kpIndex' ? 'KP Index' :
                       selectedMetric === 'solarWindSpeed' ? 'Solar Wind Speed' :
                       selectedMetric === 'xrayFlux' ? 'X-Ray Flux' : 'Alert Count'}
                color={
                  selectedMetric === 'kpIndex' ? '#3B82F6' :
                  selectedMetric === 'solarWindSpeed' ? '#8B5CF6' :
                  selectedMetric === 'xrayFlux' ? '#EF4444' : '#F59E0B'
                }
              />
            </div>
            
            <div className="mt-4 grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {filteredData.length > 0 ? filteredData[filteredData.length - 1].kpIndex.toFixed(1) : '--'}
                </div>
                <div className="text-xs text-gray-600 font-['Roboto_Mono:Regular',_sans-serif]">Current KP</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {filteredData.length > 0 ? filteredData[filteredData.length - 1].solarWindSpeed.toFixed(0) : '--'}
                </div>
                <div className="text-xs text-gray-600 font-['Roboto_Mono:Regular',_sans-serif]">Wind Speed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {filteredData.length > 0 ? filteredData[filteredData.length - 1].xrayFlux : '--'}
                </div>
                <div className="text-xs text-gray-600 font-['Roboto_Mono:Regular',_sans-serif]">X-Ray Class</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {filteredData.reduce((sum, point) => sum + point.alerts, 0)}
                </div>
                <div className="text-xs text-gray-600 font-['Roboto_Mono:Regular',_sans-serif]">Total Alerts ({selectedTimeRange})</div>
              </div>
            </div>
          </div>

          {/* Statistical Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h4 className="font-['Roboto_Mono:Medium',_sans-serif] font-medium text-gray-900 text-lg mb-4">KP Index Statistics</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Average:</span>
                  <span className="font-mono">
                    {historicalData.length > 0 ? 
                      (historicalData.reduce((sum, p) => sum + p.kpIndex, 0) / historicalData.length).toFixed(1) : 
                      '--'
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Maximum:</span>
                  <span className="font-mono">
                    {historicalData.length > 0 ? Math.max(...historicalData.map(p => p.kpIndex)).toFixed(1) : '--'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Storm Days:</span>
                  <span className="font-mono">
                    {historicalData.filter(p => p.kpIndex >= 5).length}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h4 className="font-['Roboto_Mono:Medium',_sans-serif] font-medium text-gray-900 text-lg mb-4">Solar Wind Analysis</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Speed:</span>
                  <span className="font-mono">
                    {historicalData.length > 0 ? 
                      (historicalData.reduce((sum, p) => sum + p.solarWindSpeed, 0) / historicalData.length).toFixed(0) : 
                      '--'
                    } km/s
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Peak Speed:</span>
                  <span className="font-mono">
                    {historicalData.length > 0 ? Math.max(...historicalData.map(p => p.solarWindSpeed)).toFixed(0) : '--'} km/s
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">High Speed Events:</span>
                  <span className="font-mono">
                    {historicalData.filter(p => p.solarWindSpeed > 600).length}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h4 className="font-['Roboto_Mono:Medium',_sans-serif] font-medium text-gray-900 text-lg mb-4">Alert Summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Alerts:</span>
                  <span className="font-mono">
                    {historicalData.reduce((sum, p) => sum + p.alerts, 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg per Day:</span>
                  <span className="font-mono">
                    {historicalData.length > 0 ? 
                      (historicalData.reduce((sum, p) => sum + p.alerts, 0) / historicalData.length).toFixed(1) : 
                      '--'
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Peak Day:</span>
                  <span className="font-mono">
                    {historicalData.length > 0 ? Math.max(...historicalData.map(p => p.alerts)) : '--'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Events */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h4 className="font-['Roboto_Mono:Medium',_sans-serif] font-medium text-gray-900 text-lg mb-4">Recent Significant Events</h4>
            <div className="space-y-3">
              {historicalData
                .filter(point => point.kpIndex >= 5 || point.solarWindSpeed > 600 || point.alerts > 2)
                .slice(-5)
                .map((event, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <div>
                      <div className="font-medium text-gray-900">
                        {event.kpIndex >= 5 && 'Geomagnetic Storm'}
                        {event.solarWindSpeed > 600 && 'High Speed Solar Wind'}
                        {event.alerts > 2 && 'Multiple Alerts'}
                      </div>
                      <div className="text-sm text-gray-600">
                        KP: {event.kpIndex.toFixed(1)} | Wind: {event.solarWindSpeed.toFixed(0)} km/s | Alerts: {event.alerts}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(event.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-64 w-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading historical data...</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Settings Component
function Settings({ settings, updateSettings }: { settings: Settings; updateSettings: (newSettings: Partial<Settings>) => void }) {
  const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: (value: boolean) => void }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${
        enabled ? 'bg-blue-500' : 'bg-gray-300'
      }`}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform duration-200 ${
          enabled ? 'translate-x-6' : 'translate-x-0.5'
        }`}
      />
    </button>
  );

  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <div className="box-border content-stretch flex h-[97px] items-start justify-between pb-px pt-0 px-0 relative shrink-0 w-full">
        <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(218,218,218,0.53)] border-solid inset-0 pointer-events-none" />
        
        <div className="h-[72px] relative shrink-0 w-[460.648px]">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[72px] items-start relative w-[460.648px]">
            <div className="content-stretch flex h-[36px] items-start relative shrink-0 w-full">
              <p className="basis-0 font-['Kode_Mono:Bold',_sans-serif] font-bold grow leading-[36px] min-h-px min-w-px relative shrink-0 text-[#7b7b7b] text-[30px] tracking-[-0.3545px]">Settings</p>
            </div>
            <div className="h-[28px] relative shrink-0 w-full">
              <p className="absolute font-['Roboto_Mono:Regular',_sans-serif] font-normal leading-[28px] left-0 text-[18px] text-gray-900 text-nowrap top-0 tracking-[-0.4395px] whitespace-pre">System configuration and preferences</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-2xl space-y-8 flex-1">
        {/* Essential Settings */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
          <h3 className="font-['Kode_Mono:Bold',_sans-serif] font-bold text-gray-900 text-xl mb-6">Monitoring Settings</h3>
          
          <div className="space-y-8">
            {/* Real-time Updates */}
            <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div>
                <label className="font-['Kode_Mono:Medium',_sans-serif] font-medium text-gray-900 text-lg">Real-time Updates</label>
                <p className="font-['Roboto_Mono:Regular',_sans-serif] text-gray-600 text-sm mt-1">Automatically refresh space weather data</p>
              </div>
              <ToggleSwitch 
                enabled={settings.realTimeUpdates} 
                onChange={(value) => updateSettings({ realTimeUpdates: value })}
              />
            </div>
            
            {/* Update Frequency */}
            <div>
              <label className="font-['Kode_Mono:Medium',_sans-serif] font-medium text-gray-900 text-lg block mb-3">Update Frequency</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[10, 30, 60, 300, 600].map((interval) => (
                  <button
                    key={interval}
                    onClick={() => updateSettings({ updateInterval: interval })}
                    className={`p-3 rounded-lg border text-center transition-colors ${
                      settings.updateInterval === interval
                        ? 'bg-blue-100 border-blue-300 text-blue-800'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium">
                      {interval < 60 ? `${interval}s` : interval === 60 ? '1m' : `${interval/60}m`}
                    </div>
                  </button>
                ))}
              </div>
              <p className="font-['Roboto_Mono:Regular',_sans-serif] text-gray-500 text-sm mt-2">How often to fetch new data from stations</p>
            </div>

            {/* Alert Notifications */}
            <div className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div>
                <label className="font-['Kode_Mono:Medium',_sans-serif] font-medium text-gray-900 text-lg">Alert Notifications</label>
                <p className="font-['Roboto_Mono:Regular',_sans-serif] text-gray-600 text-sm mt-1">Show space weather alerts and warnings</p>
              </div>
              <ToggleSwitch 
                enabled={settings.alertNotifications} 
                onChange={(value) => updateSettings({ alertNotifications: value })}
              />
            </div>
          </div>
        </div>

        {/* Display Preferences */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
          <h3 className="font-['Kode_Mono:Bold',_sans-serif] font-bold text-gray-900 text-xl mb-6">Display Preferences</h3>
          
          <div className="space-y-8">
            {/* Temperature Units */}
            <div>
              <label className="font-['Kode_Mono:Medium',_sans-serif] font-medium text-gray-900 text-lg block mb-3">Temperature Units</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'kelvin', label: 'Kelvin (K)', desc: 'Scientific standard' },
                  { value: 'celsius', label: 'Celsius (°C)', desc: 'Metric system' },
                  { value: 'fahrenheit', label: 'Fahrenheit (°F)', desc: 'Imperial system' }
                ].map((unit) => (
                  <button
                    key={unit.value}
                    onClick={() => updateSettings({ temperatureUnit: unit.value as 'kelvin' | 'celsius' | 'fahrenheit' })}
                    className={`p-4 rounded-lg border text-center transition-colors ${
                      settings.temperatureUnit === unit.value
                        ? 'bg-blue-100 border-blue-300 text-blue-800'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-['Kode_Mono:Medium',_sans-serif] font-medium">{unit.label}</div>
                    <div className="font-['Roboto_Mono:Regular',_sans-serif] text-xs text-gray-600 mt-1">{unit.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Format */}
            <div>
              <label className="font-['Kode_Mono:Medium',_sans-serif] font-medium text-gray-900 text-lg block mb-3">Time Format</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: '24', label: '24-hour', desc: '23:59 format' },
                  { value: '12', label: '12-hour', desc: '11:59 PM format' }
                ].map((format) => (
                  <button
                    key={format.value}
                    onClick={() => updateSettings({ timeFormat: format.value as '24' | '12' })}
                    className={`p-4 rounded-lg border text-center transition-colors ${
                      settings.timeFormat === format.value
                        ? 'bg-blue-100 border-blue-300 text-blue-800'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-['Kode_Mono:Medium',_sans-serif] font-medium">{format.label}</div>
                    <div className="font-['Roboto_Mono:Regular',_sans-serif] text-xs text-gray-600 mt-1">{format.desc}</div>
                  </button>
                ))}
              </div>
            </div>
        
          </div>
        </div>

        {/* Settings Management */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h4 className="font-['Kode_Mono:Medium',_sans-serif] font-medium text-gray-900 text-lg">Settings Management</h4>
              <p className="font-['Roboto_Mono:Regular',_sans-serif] text-sm text-gray-600 mt-1">Settings are automatically saved to your device</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  if (confirm('Reset all settings to defaults? This action cannot be undone.')) {
                    localStorage.removeItem('astroalert-settings');
                    window.location.reload();
                  }
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors font-['Roboto_Mono:Medium',_sans-serif]"
              >
                Reset Defaults
              </button>
              <button 
                onClick={() => {
                  const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'astroalert-settings.json';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-['Roboto_Mono:Medium',_sans-serif]"
              >
                Export Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Threat Details Panel Component
function ThreatDetailsPanel({ spaceWeatherData, alerts, formatTemperature, formatTime }: { 
  spaceWeatherData: SpaceWeatherData | null; 
  alerts: AlertData[]; 
  formatTemperature: (temp: number) => string;
  formatTime: (timestamp: string) => string;
}) {
  // Calculate threat level based on space weather conditions
  const getThreatLevel = () => {
    if (!spaceWeatherData) return { level: 'UNKNOWN', color: 'gray', description: 'Data loading...', factors: [] };
    
    const kp = spaceWeatherData.kpIndex;
    const solarWind = spaceWeatherData.solarWind.speed;
    const xrayClass = spaceWeatherData.solarActivity.xrayFlux.charAt(0);
    
    const factors = [];
    if (kp >= 7) factors.push(`Extreme KP Index (${kp.toFixed(1)})`);
    else if (kp >= 5) factors.push(`High KP Index (${kp.toFixed(1)})`);
    else if (kp >= 3) factors.push(`Elevated KP Index (${kp.toFixed(1)})`);
    
    if (solarWind > 800) factors.push(`Extreme Solar Wind Speed (${solarWind.toFixed(0)} km/s)`);
    else if (solarWind > 600) factors.push(`High Solar Wind Speed (${solarWind.toFixed(0)} km/s)`);
    else if (solarWind > 500) factors.push(`Elevated Solar Wind Speed (${solarWind.toFixed(0)} km/s)`);
    
    if (xrayClass === 'X') factors.push(`X-Class Solar Flares (${spaceWeatherData.solarActivity.xrayFlux})`);
    else if (xrayClass === 'M') factors.push(`M-Class Solar Flares (${spaceWeatherData.solarActivity.xrayFlux})`);
    else if (xrayClass === 'C') factors.push(`C-Class Solar Flares (${spaceWeatherData.solarActivity.xrayFlux})`);
    
    if (kp >= 7 || solarWind > 800 || xrayClass === 'X') {
      return { 
        level: 'EXTREME', 
        color: 'red', 
        description: 'Severe space weather conditions with potential for significant impacts on technology systems',
        factors
      };
    } else if (kp >= 5 || solarWind > 600 || xrayClass === 'M') {
      return { 
        level: 'HIGH', 
        color: 'orange', 
        description: 'Active space weather conditions with moderate risk to satellite operations and communications',
        factors
      };
    } else if (kp >= 3 || solarWind > 500 || xrayClass === 'C') {
      return { 
        level: 'MODERATE', 
        color: 'yellow', 
        description: 'Elevated space weather activity with minor potential for system disruptions',
        factors
      };
    } else {
      return { 
        level: 'LOW', 
        color: 'green', 
        description: 'Quiet space weather conditions with minimal risk to space-based systems',
        factors: factors.length > 0 ? factors : ['All parameters within normal ranges']
      };
    }
  };

  const currentThreat = getThreatLevel();
  const activeAlerts = alerts.filter(alert => alert.active);
  const criticalAlerts = activeAlerts.filter(alert => alert.severity === 'high' || alert.severity === 'extreme');

  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <div className="box-border content-stretch flex h-[97px] items-start justify-between pb-px pt-0 px-0 relative shrink-0 w-full">
        <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(218,218,218,0.53)] border-solid inset-0 pointer-events-none" />
        
        <div className="h-[72px] relative shrink-0 w-[460.648px]">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[72px] items-start relative w-[460.648px]">
            <div className="content-stretch flex h-[36px] items-start relative shrink-0 w-full">
              <p className="basis-0 font-['Kode_Mono:Bold',_sans-serif] font-bold grow leading-[36px] min-h-px min-w-px relative shrink-0 text-[#7b7b7b] text-[30px] tracking-[-0.3545px]">Threat Assessment Details</p>
            </div>
            <div className="h-[28px] relative shrink-0 w-full">
              <p className="absolute font-['Roboto_Mono:Regular',_sans-serif] font-normal leading-[28px] left-0 text-[18px] text-gray-900 text-nowrap top-0 tracking-[-0.4395px] whitespace-pre">Comprehensive space weather threat analysis and risk factors</p>
            </div>
          </div>
        </div>

        <div className="h-[44px] relative shrink-0 w-[202.297px]">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[44px] items-start relative w-[202.297px]">
            <div className="h-[20px] relative shrink-0 w-full">
              <p className="absolute font-['Cousine:Regular',_sans-serif] leading-[20px] left-[203px] not-italic text-[14px] text-gray-900 text-right top-[-0.5px] translate-x-[-100%] w-[203px]">Current Threat: {currentThreat.level}</p>
            </div>
            <div className="content-stretch flex gap-[8px] h-[20px] items-center justify-end relative shrink-0 w-full">
      
            </div>
          </div>
        </div>
      </div>

      <div className="w-full space-y-8 flex-1">
        
        {/* Current Threat Assessment */}
        <div className={`bg-gradient-to-br border rounded-lg p-8 shadow-lg ${
          currentThreat.color === 'red' ? 'from-red-50 to-red-100 border-red-200' :
          currentThreat.color === 'orange' ? 'from-orange-50 to-orange-100 border-orange-200' :
          currentThreat.color === 'yellow' ? 'from-yellow-50 to-yellow-100 border-yellow-200' :
          'from-green-50 to-green-100 border-green-200'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-['Kode_Mono:Bold',_sans-serif] font-bold text-gray-900 text-2xl">Current Threat Level</h3>
            <div className={`text-6xl font-bold ${
              currentThreat.color === 'red' ? 'text-red-600' :
              currentThreat.color === 'orange' ? 'text-orange-600' :
              currentThreat.color === 'yellow' ? 'text-yellow-600' :
              'text-green-600'
            }`}>{currentThreat.level}</div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="font-['Kode_Mono:Medium',_sans-serif] font-medium text-gray-900 text-lg mb-3">Assessment</h4>
              <p className="font-['Roboto_Mono:Regular',_sans-serif] text-gray-800 text-base leading-relaxed">{currentThreat.description}</p>
            </div>
            
            <div>
              <h4 className="font-['Kode_Mono:Medium',_sans-serif] font-medium text-gray-900 text-lg mb-3">Contributing Factors</h4>
              <ul className="space-y-2">
                {currentThreat.factors.map((factor, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      currentThreat.color === 'red' ? 'bg-red-500' :
                      currentThreat.color === 'orange' ? 'bg-orange-500' :
                      currentThreat.color === 'yellow' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}></div>
                    <span className="font-['Roboto_Mono:Regular',_sans-serif] text-gray-700 text-sm">{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Threat Level Legend */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
          <h3 className="font-['Kode_Mono:Bold',_sans-serif] font-bold text-gray-900 text-xl mb-6">Space Weather Threat Scale</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* LOW Threat */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                <h4 className="font-['Kode_Mono:Bold',_sans-serif] font-bold text-green-800 text-lg">LOW</h4>
              </div>
              <div className="space-y-3">
                <p className="font-['Roboto_Mono:Regular',_sans-serif] text-green-700 text-sm">Quiet space weather conditions with minimal risk.</p>
                <div className="space-y-1 text-xs">
                  <div className="font-['Roboto_Mono:Medium',_sans-serif] text-green-800">Conditions:</div>
                  <div className="font-['Roboto_Mono:Regular',_sans-serif] text-green-600">• KP Index: 0-2</div>
                  <div className="font-['Roboto_Mono:Regular',_sans-serif] text-green-600">• Solar Wind: &lt;500 km/s</div>
                  <div className="font-['Roboto_Mono:Regular',_sans-serif] text-green-600">• X-Ray: A/B Class</div>
                </div>
              </div>
            </div>

            {/* MODERATE Threat */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                <h4 className="font-['Kode_Mono:Bold',_sans-serif] font-bold text-yellow-800 text-lg">MODERATE</h4>
              </div>
              <div className="space-y-3">
                <p className="font-['Roboto_Mono:Regular',_sans-serif] text-yellow-700 text-sm">Elevated activity with minor potential for disruptions.</p>
                <div className="space-y-1 text-xs">
                  <div className="font-['Roboto_Mono:Medium',_sans-serif] text-yellow-800">Conditions:</div>
                  <div className="font-['Roboto_Mono:Regular',_sans-serif] text-yellow-600">• KP Index: 3-4</div>
                  <div className="font-['Roboto_Mono:Regular',_sans-serif] text-yellow-600">• Solar Wind: 500-600 km/s</div>
                  <div className="font-['Roboto_Mono:Regular',_sans-serif] text-yellow-600">• X-Ray: C Class</div>
                </div>
              </div>
            </div>

            {/* HIGH Threat */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                <h4 className="font-['Kode_Mono:Bold',_sans-serif] font-bold text-orange-800 text-lg">HIGH</h4>
              </div>
              <div className="space-y-3">
                <p className="font-['Roboto_Mono:Regular',_sans-serif] text-orange-700 text-sm">Active conditions with moderate risk to operations.</p>
                <div className="space-y-1 text-xs">
                  <div className="font-['Roboto_Mono:Medium',_sans-serif] text-orange-800">Conditions:</div>
                  <div className="font-['Roboto_Mono:Regular',_sans-serif] text-orange-600">• KP Index: 5-6</div>
                  <div className="font-['Roboto_Mono:Regular',_sans-serif] text-orange-600">• Solar Wind: 600-800 km/s</div>
                  <div className="font-['Roboto_Mono:Regular',_sans-serif] text-orange-600">• X-Ray: M Class</div>
                </div>
              </div>
            </div>

            {/* EXTREME Threat */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
                <h4 className="font-['Kode_Mono:Bold',_sans-serif] font-bold text-red-800 text-lg">EXTREME</h4>
              </div>
              <div className="space-y-3">
                <p className="font-['Roboto_Mono:Regular',_sans-serif] text-red-700 text-sm">Severe conditions with significant impact potential.</p>
                <div className="space-y-1 text-xs">
                  <div className="font-['Roboto_Mono:Medium',_sans-serif] text-red-800">Conditions:</div>
                  <div className="font-['Roboto_Mono:Regular',_sans-serif] text-red-600">• KP Index: 7-9</div>
                  <div className="font-['Roboto_Mono:Regular',_sans-serif] text-red-600">• Solar Wind: &gt;800 km/s</div>
                  <div className="font-['Roboto_Mono:Regular',_sans-serif] text-red-600">• X-Ray: X Class</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Assessment */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
          <h3 className="font-['Kode_Mono:Bold',_sans-serif] font-bold text-gray-900 text-xl mb-6">Potential Impacts by Threat Level</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <div>
              <h4 className="font-['Kode_Mono:Medium',_sans-serif] font-medium text-gray-900 text-lg mb-4">Satellite Operations</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-1"></div>
                  <div>
                    <div className="font-['Roboto_Mono:Medium',_sans-serif] text-sm text-gray-900">LOW: Normal Operations</div>
                    <div className="font-['Roboto_Mono:Regular',_sans-serif] text-xs text-gray-600">All satellite systems functioning normally</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mt-1"></div>
                  <div>
                    <div className="font-['Roboto_Mono:Medium',_sans-serif] text-sm text-gray-900">MODERATE: Minor Disruptions</div>
                    <div className="font-['Roboto_Mono:Regular',_sans-serif] text-xs text-gray-600">Possible drag increase, minor orientation issues</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mt-1"></div>
                  <div>
                    <div className="font-['Roboto_Mono:Medium',_sans-serif] text-sm text-gray-900">HIGH: Operational Impacts</div>
                    <div className="font-['Roboto_Mono:Regular',_sans-serif] text-xs text-gray-600">Charging anomalies, surface charging events</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-1"></div>
                  <div>
                    <div className="font-['Roboto_Mono:Medium',_sans-serif] text-sm text-gray-900">EXTREME: System Failures</div>
                    <div className="font-['Roboto_Mono:Regular',_sans-serif] text-xs text-gray-600">Component damage, loss of satellite control</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-['Kode_Mono:Medium',_sans-serif] font-medium text-gray-900 text-lg mb-4">Communications</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-1"></div>
                  <div>
                    <div className="font-['Roboto_Mono:Medium',_sans-serif] text-sm text-gray-900">LOW: No Impact</div>
                    <div className="font-['Roboto_Mono:Regular',_sans-serif] text-xs text-gray-600">All communication systems normal</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mt-1"></div>
                  <div>
                    <div className="font-['Roboto_Mono:Medium',_sans-serif] text-sm text-gray-900">MODERATE: Weak Signal Areas</div>
                    <div className="font-['Roboto_Mono:Regular',_sans-serif] text-xs text-gray-600">Degraded HF radio propagation</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mt-1"></div>
                  <div>
                    <div className="font-['Roboto_Mono:Medium',_sans-serif] text-sm text-gray-900">HIGH: Radio Blackouts</div>
                    <div className="font-['Roboto_Mono:Regular',_sans-serif] text-xs text-gray-600">HF radio blackouts, GPS degradation</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-1"></div>
                  <div>
                    <div className="font-['Roboto_Mono:Medium',_sans-serif] text-sm text-gray-900">EXTREME: Complete Blackouts</div>
                    <div className="font-['Roboto_Mono:Regular',_sans-serif] text-xs text-gray-600">Widespread HF blackouts, GPS errors</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Active Alerts */}
        {criticalAlerts.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6">
            <h3 className="font-['Kode_Mono:Bold',_sans-serif] font-bold text-red-800 text-xl mb-4">Critical Active Alerts</h3>
            <div className="space-y-4">
              {criticalAlerts.map((alert) => (
                <div key={alert.id} className="bg-white border border-red-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-['Kode_Mono:Medium',_sans-serif] font-medium text-gray-900 text-lg">{alert.type}</h4>
                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                      alert.severity === 'extreme' ? 'bg-red-100 text-red-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {alert.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="font-['Roboto_Mono:Regular',_sans-serif] text-gray-700 text-sm mb-2">{alert.message}</p>
                  <div className="font-['Roboto_Mono:Regular',_sans-serif] text-xs text-gray-500">
                    Active since: {formatTime(alert.timestamp)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Parameter Thresholds */}
        {spaceWeatherData && (
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <h3 className="font-['Kode_Mono:Bold',_sans-serif] font-bold text-gray-900 text-xl mb-6">Current Parameter Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* KP Index Analysis */}
              <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-['Kode_Mono:Medium',_sans-serif] font-medium text-gray-900 text-lg mb-3">KP Index</h4>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-blue-600 mb-1">{spaceWeatherData.kpIndex.toFixed(1)}</div>
                  <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                    spaceWeatherData.kpIndex >= 7 ? 'bg-red-100 text-red-800' :
                    spaceWeatherData.kpIndex >= 5 ? 'bg-orange-100 text-orange-800' :
                    spaceWeatherData.kpIndex >= 3 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {spaceWeatherData.kpIndex >= 7 ? 'STORM' :
                     spaceWeatherData.kpIndex >= 5 ? 'ACTIVE' :
                     spaceWeatherData.kpIndex >= 3 ? 'UNSETTLED' : 'QUIET'}
                  </div>
                </div>
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span>Quiet (0-2):</span>
                    <span className={spaceWeatherData.kpIndex < 3 ? 'text-green-600 font-bold' : 'text-gray-500'}>✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Unsettled (3-4):</span>
                    <span className={spaceWeatherData.kpIndex >= 3 && spaceWeatherData.kpIndex < 5 ? 'text-yellow-600 font-bold' : 'text-gray-500'}>✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active (5-6):</span>
                    <span className={spaceWeatherData.kpIndex >= 5 && spaceWeatherData.kpIndex < 7 ? 'text-orange-600 font-bold' : 'text-gray-500'}>✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Storm (7-9):</span>
                    <span className={spaceWeatherData.kpIndex >= 7 ? 'text-red-600 font-bold' : 'text-gray-500'}>✓</span>
                  </div>
                </div>
              </div>

              {/* Solar Wind Analysis */}
              <div className="p-6 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-['Kode_Mono:Medium',_sans-serif] font-medium text-gray-900 text-lg mb-3">Solar Wind Speed</h4>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-purple-600 mb-1">{spaceWeatherData.solarWind.speed.toFixed(0)}</div>
                  <div className="text-sm text-purple-700">km/s</div>
                  <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                    spaceWeatherData.solarWind.speed > 800 ? 'bg-red-100 text-red-800' :
                    spaceWeatherData.solarWind.speed > 600 ? 'bg-orange-100 text-orange-800' :
                    spaceWeatherData.solarWind.speed > 500 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {spaceWeatherData.solarWind.speed > 800 ? 'EXTREME' :
                     spaceWeatherData.solarWind.speed > 600 ? 'HIGH' :
                     spaceWeatherData.solarWind.speed > 500 ? 'ELEVATED' : 'NORMAL'}
                  </div>
                </div>
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span>Normal (&lt;500):</span>
                    <span className={spaceWeatherData.solarWind.speed < 500 ? 'text-green-600 font-bold' : 'text-gray-500'}>✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Elevated (500-600):</span>
                    <span className={spaceWeatherData.solarWind.speed >= 500 && spaceWeatherData.solarWind.speed <= 600 ? 'text-yellow-600 font-bold' : 'text-gray-500'}>✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>High (600-800):</span>
                    <span className={spaceWeatherData.solarWind.speed > 600 && spaceWeatherData.solarWind.speed <= 800 ? 'text-orange-600 font-bold' : 'text-gray-500'}>✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Extreme (&gt;800):</span>
                    <span className={spaceWeatherData.solarWind.speed > 800 ? 'text-red-600 font-bold' : 'text-gray-500'}>✓</span>
                  </div>
                </div>
              </div>

              {/* X-Ray Flux Analysis */}
              <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-['Kode_Mono:Medium',_sans-serif] font-medium text-gray-900 text-lg mb-3">X-Ray Flux</h4>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-red-600 mb-1">{spaceWeatherData.solarActivity.xrayFlux}</div>
                  <div className="text-sm text-red-700">Class</div>
                  <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                    spaceWeatherData.solarActivity.xrayFlux.charAt(0) === 'X' ? 'bg-red-100 text-red-800' :
                    spaceWeatherData.solarActivity.xrayFlux.charAt(0) === 'M' ? 'bg-orange-100 text-orange-800' :
                    spaceWeatherData.solarActivity.xrayFlux.charAt(0) === 'C' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {spaceWeatherData.solarActivity.xrayFlux.charAt(0) === 'X' ? 'EXTREME' :
                     spaceWeatherData.solarActivity.xrayFlux.charAt(0) === 'M' ? 'STRONG' :
                     spaceWeatherData.solarActivity.xrayFlux.charAt(0) === 'C' ? 'MODERATE' : 'WEAK'}
                  </div>
                </div>
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span>A/B Class:</span>
                    <span className={['A', 'B'].includes(spaceWeatherData.solarActivity.xrayFlux.charAt(0)) ? 'text-green-600 font-bold' : 'text-gray-500'}>✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>C Class:</span>
                    <span className={spaceWeatherData.solarActivity.xrayFlux.charAt(0) === 'C' ? 'text-yellow-600 font-bold' : 'text-gray-500'}>✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>M Class:</span>
                    <span className={spaceWeatherData.solarActivity.xrayFlux.charAt(0) === 'M' ? 'text-orange-600 font-bold' : 'text-gray-500'}>✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>X Class:</span>
                    <span className={spaceWeatherData.solarActivity.xrayFlux.charAt(0) === 'X' ? 'text-red-600 font-bold' : 'text-gray-500'}>✓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
          <h3 className="font-['Kode_Mono:Bold',_sans-serif] font-bold text-gray-900 text-xl mb-6">Operational Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-['Kode_Mono:Medium',_sans-serif] font-medium text-gray-900 text-lg mb-4">Immediate Actions</h4>
              <ul className="space-y-3">
                {currentThreat.level === 'EXTREME' && (
                  <>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <span className="font-['Roboto_Mono:Regular',_sans-serif] text-sm">Activate emergency space weather protocols</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <span className="font-['Roboto_Mono:Regular',_sans-serif] text-sm">Consider protective satellite maneuvers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <span className="font-['Roboto_Mono:Regular',_sans-serif] text-sm">Enhanced monitoring of critical systems</span>
                    </li>
                  </>
                )}
                {currentThreat.level === 'HIGH' && (
                  <>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <span className="font-['Roboto_Mono:Regular',_sans-serif] text-sm">Increase monitoring frequency</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <span className="font-['Roboto_Mono:Regular',_sans-serif] text-sm">Prepare backup communication channels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <span className="font-['Roboto_Mono:Regular',_sans-serif] text-sm">Review satellite operational status</span>
                    </li>
                  </>
                )}
                {currentThreat.level === 'MODERATE' && (
                  <>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <span className="font-['Roboto_Mono:Regular',_sans-serif] text-sm">Continue normal operations with awareness</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <span className="font-['Roboto_Mono:Regular',_sans-serif] text-sm">Monitor for changing conditions</span>
                    </li>
                  </>
                )}
                {currentThreat.level === 'LOW' && (
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <span className="font-['Roboto_Mono:Regular',_sans-serif] text-sm">Normal operations - no special precautions needed</span>
                  </li>
                )}
              </ul>
            </div>
            
            <div>
              <h4 className="font-['Kode_Mono:Medium',_sans-serif] font-medium text-gray-900 text-lg mb-4">Monitoring Priority</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="font-['Roboto_Mono:Regular',_sans-serif] text-sm">Real-time KP index trending</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="font-['Roboto_Mono:Regular',_sans-serif] text-sm">Solar wind parameter changes</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="font-['Roboto_Mono:Regular',_sans-serif] text-sm">Emerging solar flare activity</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="font-['Roboto_Mono:Regular',_sans-serif] text-sm">Satellite health status updates</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AstroAlertApp;