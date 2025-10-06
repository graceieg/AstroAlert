import svgPaths from "./svg-lscuvymg1x";

function Section() {
  return <div className="absolute h-0 left-0 top-[908px] w-[1167px]" data-name="Section" />;
}

function Container() {
  return <div className="absolute bg-[rgba(79,195,247,0.05)] blur-3xl filter left-[291.75px] opacity-[0.913] rounded-[1.67772e+07px] size-[384px] top-[227px]" data-name="Container" />;
}

function Container1() {
  return <div className="absolute bg-[rgba(255,138,101,0.05)] blur-3xl filter left-[491.25px] opacity-[0.587] rounded-[1.67772e+07px] size-[384px] top-[297px]" data-name="Container" />;
}

function Container2() {
  return <div className="absolute bg-[rgba(42,52,65,0.05)] blur-2xl filter left-[583.5px] opacity-[0.913] rounded-[1.67772e+07px] size-[256px] top-[454px]" data-name="Container" />;
}

function Container3() {
  return (
    <div className="absolute h-[908px] left-0 overflow-clip top-0 w-[1167px]" data-name="Container">
      <Container />
      <Container1 />
      <Container2 />
    </div>
  );
}

function Container4() {
  return <div className="absolute bg-gradient-to-r from-[rgba(79,195,247,0.05)] h-[63px] left-0 to-[rgba(255,138,101,0.05)] top-0 via-50% via-[rgba(0,0,0,0)] w-[1440px]" data-name="Container" />;
}

function Heading1() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['Kode_Mono:Bold',_sans-serif] font-bold leading-[28px] left-0 text-[#585467] text-[20px] text-nowrap top-0 tracking-[0.0508px] whitespace-pre">AstroAlert</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[16px] left-0 not-italic text-[#a0a9b8] text-[12px] text-nowrap top-px whitespace-pre">Space Weather Monitoring</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex flex-col h-[44px] items-start left-[16px] top-[0.5px] w-[203px]" data-name="Container">
      <Heading1 />
      <Paragraph />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute h-[44px] left-[24px] top-[9.5px] w-[193.227px]" data-name="Container">
      <Container5 />
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Bold',_sans-serif] font-bold leading-[20px] left-[152.21px] not-italic text-[#585467] text-[14px] text-right top-[0.5px] tracking-[0.28px] translate-x-[-100%] w-[105px]">18:16:13 UTC</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Cousine:Regular',_sans-serif] leading-[16px] left-[152px] not-italic text-[#a0a9b8] text-[12px] text-right top-0 translate-x-[-100%] w-[152px]">Last update: 18:15:50</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[36px] relative shrink-0 w-[151.719px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[36px] items-start relative w-[151.719px]">
        <Container7 />
        <Container8 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-[#00994c] opacity-[0.913] relative rounded-[1.67772e+07px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[8px]" />
    </div>
  );
}

function Text() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
        <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-0 not-italic text-[#00994c] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Systems Nominal</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute bg-[rgba(5,223,114,0.1)] box-border content-stretch flex gap-[4px] h-[30px] items-center left-[44px] px-[13px] py-px rounded-[1.67772e+07px] top-px w-[152.203px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(5,223,114,0.2)] border-solid inset-0 pointer-events-none rounded-[1.67772e+07px]" />
      <Container10 />
      <Text />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[10px] size-[16px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1e6eff00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p5baad20} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Badge() {
  return (
    <div className="absolute bg-[#ff5a5f] left-[20px] opacity-[0.913] rounded-[8px] size-[20px] top-[-4px]" data-name="Badge">
      <div className="box-border content-stretch flex gap-[4px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-[20px]">
        <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0f1419] text-[12px] text-nowrap whitespace-pre">2</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute h-[32px] left-0 rounded-[8px] top-0 w-[36px]" data-name="Button">
      <Icon />
      <Badge />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p399eca00} id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pc93b400} id="Vector_2" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="basis-0 bg-[#a0a9b8] grow h-[32px] min-h-px min-w-px relative rounded-[1.67772e+07px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-center justify-center relative w-full">
        <Icon1 />
      </div>
    </div>
  );
}

function PrimitiveSpan() {
  return (
    <div className="absolute content-stretch flex items-start left-[204.2px] overflow-clip rounded-[1.67772e+07px] size-[32px] top-0" data-name="Primitive.span">
      <Text1 />
    </div>
  );
}

function Container12() {
  return (
    <div className="basis-0 grow h-[32px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-full">
        <Container11 />
        <Button />
        <PrimitiveSpan />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex gap-[24px] h-[36px] items-center left-[943px] top-[13.5px] w-[411.922px]" data-name="Container">
      <Container9 />
      <Container12 />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute bg-white h-[64px] left-0 top-0 w-[1440px]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(232,234,237,0.12)] border-solid inset-0 pointer-events-none" />
      <Container4 />
      <Container6 />
      <Container13 />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="absolute h-[20px] left-[10px] top-[6px] w-[89.961px]" data-name="Sidebar">
      <p className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[20px] left-0 not-italic text-[14px] text-gray-50 text-nowrap top-[0.5px] tracking-[0.1996px] whitespace-pre">NAVIGATION</p>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[229px] size-[16px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M10 12L6 8L10 4" id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <Sidebar />
      <Icon2 />
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[65px] relative shrink-0 w-[287px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(232,234,237,0.12)] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[65px] items-start pb-px pt-[16px] px-[16px] relative w-[287px]">
        <Button1 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[10px] size-[16px] top-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p542e500} id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M11 5L12.6667 3.33333" id="Vector_2" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pd813f40} id="Vector_3" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p217bd500} id="Vector_4" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3e5de570} id="Vector_5" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[72.008px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full relative w-[72.008px]">
        <p className="absolute font-['Roboto_Mono:Medium',_sans-serif] font-medium leading-[20px] left-0 text-[#6a6a6a] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Dashboard</p>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[16px] relative shrink-0 w-[80.68px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[80.68px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#a0a9b8] text-[12px] text-nowrap top-px whitespace-pre">Main overview</p>
      </div>
    </div>
  );
}

function Sidebar1() {
  return (
    <div className="absolute content-stretch flex flex-col h-[36px] items-start left-[39px] top-[6px] w-[80.68px]" data-name="Sidebar">
      <Text2 />
      <Text3 />
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[48px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <Icon3 />
      <Sidebar1 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-[10px] size-[16px] top-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p542e500} id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M11 5L12.6667 3.33333" id="Vector_2" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pd813f40} id="Vector_3" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p217bd500} id="Vector_4" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3e5de570} id="Vector_5" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[106.773px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full relative w-[106.773px]">
        <p className="absolute font-['Roboto_Mono:Medium',_sans-serif] font-medium leading-[20px] left-0 text-[#6a6a6a] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Satellite Tracker</p>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[16px] relative shrink-0 w-[77.641px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[77.641px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#a0a9b8] text-[12px] text-nowrap top-px whitespace-pre">Live positions</p>
      </div>
    </div>
  );
}

function Sidebar2() {
  return (
    <div className="absolute content-stretch flex flex-col h-[36px] items-start left-[38px] top-[6px] w-[106.773px]" data-name="Sidebar">
      <Text4 />
      <Text5 />
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[48px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <Icon4 />
      <Sidebar2 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-[11px] size-[16px] top-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.pff0fc00} id="Vector" stroke="var(--stroke-0, #6A6A6A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1d76d410} id="Vector_2" stroke="var(--stroke-0, #6A6A6A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2f091200} id="Vector_3" stroke="var(--stroke-0, #6A6A6A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p39897300} id="Vector_4" stroke="var(--stroke-0, #6A6A6A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text6() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[100.219px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full relative w-[100.219px]">
        <p className="absolute font-['Roboto_Mono:Medium',_sans-serif] font-medium leading-[20px] left-0 text-[#6a6a6a] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Space Weather</p>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[16px] relative shrink-0 w-[105.109px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[105.109px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#a0a9b8] text-[12px] text-nowrap top-px whitespace-pre">Current conditions</p>
      </div>
    </div>
  );
}

function Sidebar3() {
  return (
    <div className="absolute content-stretch flex flex-col h-[36px] items-start left-[38px] top-[6px] w-[105.109px]" data-name="Sidebar">
      <Text6 />
      <Text7 />
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[rgba(79,195,247,0.15)] h-[48px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(79,195,247,0.3)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_10px_15px_-3px_rgba(79,195,247,0.1),0px_4px_6px_-4px_rgba(79,195,247,0.1)]" />
      <Icon5 />
      <Sidebar3 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-[10px] size-[16px] top-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2afb2200} id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 6V8.66667" id="Vector_2" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 11.3333H8.00667" id="Vector_3" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text8() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[39.148px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full relative w-[39.148px]">
        <p className="absolute font-['Roboto_Mono:Medium',_sans-serif] font-medium leading-[20px] left-0 text-[#7b7b7b] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Alerts</p>
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[16px] relative shrink-0 w-[89.383px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[89.383px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#a0a9b8] text-[12px] text-nowrap top-px whitespace-pre">Active warnings</p>
      </div>
    </div>
  );
}

function Sidebar4() {
  return (
    <div className="absolute content-stretch flex flex-col h-[36px] items-start left-[38px] top-[6px] w-[89.383px]" data-name="Sidebar">
      <Text8 />
      <Text9 />
    </div>
  );
}

function Button5() {
  return (
    <div className="h-[48px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <Icon6 />
      <Sidebar4 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="absolute left-[10px] size-[16px] top-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p90824c0} id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M12 11.3333V6" id="Vector_2" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8.66667 11.3333V3.33333" id="Vector_3" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M5.33333 11.3333V9.33333" id="Vector_4" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text10() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[97.117px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full relative w-[97.117px]">
        <p className="absolute font-['Roboto_Mono:Medium',_sans-serif] font-medium leading-[20px] left-0 text-[#7b7b7b] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Historical Data</p>
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[16px] relative shrink-0 w-[65.359px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[65.359px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#a0a9b8] text-[12px] text-nowrap top-px whitespace-pre">Past events</p>
      </div>
    </div>
  );
}

function Sidebar5() {
  return (
    <div className="absolute content-stretch flex flex-col h-[36px] items-start left-[38px] top-[6px] w-[97.117px]" data-name="Sidebar">
      <Text10 />
      <Text11 />
    </div>
  );
}

function Button6() {
  return (
    <div className="h-[48px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <Icon7 />
      <Sidebar5 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="absolute left-[10px] size-[16px] top-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1624e0} id="Vector" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p28db2b80} id="Vector_2" stroke="var(--stroke-0, #F9FAFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text12() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[54.938px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full relative w-[54.938px]">
        <p className="absolute font-['Roboto_Mono:Medium',_sans-serif] font-medium leading-[20px] left-0 text-[#7b7b7b] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Settings</p>
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[16px] relative shrink-0 w-[76.914px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[76.914px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#a0a9b8] text-[12px] text-nowrap top-px whitespace-pre">Configuration</p>
      </div>
    </div>
  );
}

function Sidebar6() {
  return (
    <div className="absolute content-stretch flex flex-col h-[36px] items-start left-[38px] top-[6px] w-[76.914px]" data-name="Sidebar">
      <Text12 />
      <Text13 />
    </div>
  );
}

function Button7() {
  return (
    <div className="h-[48px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <Icon8 />
      <Sidebar6 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[287px]" data-name="Navigation">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-full items-start pb-0 pt-[8px] px-[8px] relative w-[287px]">
        <Button2 />
        <Button3 />
        <Button4 />
        <Button5 />
        <Button6 />
        <Button7 />
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_1_12860)" id="Icon" opacity="0.912717">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #4FC3F7)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p31d5da00} id="Vector_2" stroke="var(--stroke-0, #4FC3F7)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1 6H11" id="Vector_3" stroke="var(--stroke-0, #4FC3F7)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_1_12860">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[16px] relative shrink-0 w-[118.312px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[118.312px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#a0a9b8] text-[12px] text-nowrap top-px whitespace-pre">Real-time monitoring</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex gap-[8px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon9 />
      <Text14 />
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[49px] relative shrink-0 w-[287px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(232,234,237,0.12)] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[49px] items-start pb-0 pt-[17px] px-[16px] relative w-[287px]">
        <Container15 />
      </div>
    </div>
  );
}

function Sidebar7() {
  return (
    <div className="bg-white h-[1438px] relative shrink-0 w-[288px]" data-name="Sidebar">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-[rgba(232,234,237,0.06)] border-solid inset-0 pointer-events-none shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[1438px] items-start pl-0 pr-px py-0 relative w-[288px]">
        <Container14 />
        <Navigation />
        <Container16 />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex h-[36px] items-start relative shrink-0 w-full" data-name="Heading 1">
      <p className="basis-0 font-['Kode_Mono:Bold',_sans-serif] font-bold grow leading-[36px] min-h-px min-w-px relative shrink-0 text-[#7b7b7b] text-[30px] tracking-[-0.3545px]">Space Weather Monitor</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Roboto_Mono:Regular',_sans-serif] font-normal leading-[28px] left-0 text-[18px] text-gray-900 text-nowrap top-0 tracking-[-0.4395px] whitespace-pre">Current space weather conditions and environmental parameters</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[72px] relative shrink-0 w-[460.648px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[72px] items-start relative w-[460.648px]">
        <Heading2 />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Cousine:Regular',_sans-serif] leading-[20px] left-[203px] not-italic text-[14px] text-gray-900 text-right top-[-0.5px] translate-x-[-100%] w-[203px]">Last updated: 2:15:19 PM</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="bg-green-400 opacity-[0.913] relative rounded-[1.67772e+07px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[8px]" />
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[20px] relative shrink-0 w-[29.578px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[29.578px]">
        <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[30px] not-italic text-[14px] text-green-400 text-nowrap text-right top-[0.5px] tracking-[-0.1504px] translate-x-[-100%] whitespace-pre">LIVE</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center justify-end relative shrink-0 w-full" data-name="Container">
      <Container19 />
      <Text15 />
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[44px] relative shrink-0 w-[202.297px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[44px] items-start relative w-[202.297px]">
        <Container18 />
        <Container20 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="box-border content-stretch flex h-[97px] items-start justify-between pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(218,218,218,0.53)] border-solid inset-0 pointer-events-none" />
      <Container17 />
      <Container21 />
    </div>
  );
}

function Dashboard() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] h-[1123px] items-start relative shrink-0 w-full" data-name="Dashboard">
      <Container22 />
    </div>
  );
}

function MainContent() {
  return (
    <div className="basis-0 bg-white grow h-[1438px] min-h-px min-w-px relative shrink-0" data-name="Main Content">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[1438px] items-start pb-0 pt-[32px] px-[32px] relative w-full">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex h-[1438px] items-start left-0 overflow-clip top-[64px] w-[1440px]" data-name="Container">
      <Sidebar7 />
      <MainContent />
    </div>
  );
}

function App() {
  return (
    <div className="absolute bg-[#0f1419] h-[1502px] left-0 overflow-clip top-0 w-[1440px]" data-name="App">
      <Section />
      <Container3 />
      <Header />
      <Container23 />
    </div>
  );
}

function Text16() {
  return (
    <div className="absolute h-[18px] left-0 top-[-20000px] w-[7.242px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[18px] left-0 not-italic text-[#e8eaed] text-[12px] text-nowrap top-px whitespace-pre">2</p>
    </div>
  );
}

function Icon10() {
  return (
    <div className="absolute left-[9px] size-[16px] top-[6.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3489cb80} id="Vector" stroke="var(--stroke-0, #6A6A6A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10 3.84267V13.8427" id="Vector_2" stroke="var(--stroke-0, #6A6A6A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6 2.15733V12.1573" id="Vector_3" stroke="var(--stroke-0, #6A6A6A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton() {
  return (
    <div className="basis-0 bg-[rgba(218,218,218,0.53)] grow h-[29px] min-h-px min-w-px relative rounded-[14px] shrink-0" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(232,234,237,0.08)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[29px] relative w-full">
        <Icon10 />
        <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[33px] not-italic text-[#6a6a6a] text-[14px] text-nowrap top-[5px] tracking-[-0.1504px] whitespace-pre">2D Map</p>
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="absolute left-[9px] size-[16px] top-[6.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_13308)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #6A6A6A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p14d10c00} id="Vector_2" stroke="var(--stroke-0, #6A6A6A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M1.33333 8H14.6667" id="Vector_3" stroke="var(--stroke-0, #6A6A6A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_1_13308">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function PrimitiveButton1() {
  return (
    <div className="basis-0 grow h-[29px] min-h-px min-w-px relative rounded-[14px] shrink-0" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[29px] relative w-full">
        <Icon11 />
        <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[33px] not-italic text-[#6a6a6a] text-[14px] text-nowrap top-[5px] tracking-[-0.1504px] whitespace-pre">3D Globe</p>
      </div>
    </div>
  );
}

function PrimitiveDiv() {
  return (
    <div className="basis-0 bg-[rgba(218,218,218,0.53)] grow h-[36px] min-h-px min-w-px relative rounded-[14px] shrink-0" data-name="Primitive.div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[36px] items-center justify-center relative w-full">
        <PrimitiveButton />
        <PrimitiveButton1 />
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p12824f00} id="Vector" stroke="var(--stroke-0, #6A6A6A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveSpan1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[78.828px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[20px] items-center overflow-clip relative rounded-[inherit] w-[78.828px]">
        <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#6a6a6a] text-[14px] text-nowrap tracking-[-0.1504px] whitespace-pre">All Satellites</p>
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon" opacity="0.5">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #6A6A6A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton2() {
  return (
    <div className="bg-gray-50 h-[36px] relative rounded-[8px] shrink-0 w-[192px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[#6a6a6a] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[36px] items-center justify-between px-[13px] py-px relative w-[192px]">
        <Icon12 />
        <PrimitiveSpan1 />
        <Icon13 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[36px] relative shrink-0 w-[410.273px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[36px] items-center relative w-[410.273px]">
        <PrimitiveDiv />
        <PrimitiveButton2 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="bg-[#05df72] relative rounded-[1.67772e+07px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[8px]" />
    </div>
  );
}

function Text17() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#6a6a6a] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Low Risk</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[20px] relative shrink-0 w-[68.719px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[20px] items-center relative w-[68.719px]">
        <Container25 />
        <Text17 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="bg-[#fdc700] relative rounded-[1.67772e+07px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[8px]" />
    </div>
  );
}

function Text18() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#6a6a6a] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Moderate</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[20px] items-center relative w-full">
        <Container27 />
        <Text18 />
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="bg-[#ff6467] relative rounded-[1.67772e+07px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[8px]" />
    </div>
  );
}

function Text19() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#6a6a6a] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">High Risk</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[20px] relative shrink-0 w-[72.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[20px] items-center relative w-[72.742px]">
        <Container29 />
        <Text19 />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="h-[20px] relative shrink-0 w-[231.406px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[20px] items-center relative w-[231.406px]">
        <Container26 />
        <Container28 />
        <Container30 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute content-stretch flex h-[36px] items-center justify-between left-[328px] top-[217px] w-[974px]" data-name="Container">
      <Container24 />
      <Container31 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M10 11.6667L13.3333 8.33333" id="Vector" stroke="var(--stroke-0, #4FC3F7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p298f5d80} id="Vector_2" stroke="var(--stroke-0, #4FC3F7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function CardTitle() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[20px] top-[29px]" data-name="CardTitle">
      <Icon14 />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a6a6a] text-[16px] text-nowrap tracking-[-0.3125px] whitespace-pre">Geomagnetic Activity</p>
    </div>
  );
}

function Icon15() {
  return (
    <div className="absolute left-0 size-[128px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 128 128">
        <g id="Icon">
          <path d={svgPaths.p2af94200} id="Vector" stroke="var(--stroke-0, #EF4444)" strokeWidth="8" />
          <path d={svgPaths.p2af94200} id="Vector_2" stroke="var(--stroke-0, #FF8904)" strokeDasharray="203.3 351.86" strokeLinecap="round" strokeWidth="8" />
        </g>
      </svg>
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Bold',_sans-serif] font-bold leading-[32px] left-[24.72px] not-italic text-[#ff8904] text-[24px] text-center text-nowrap top-0 tracking-[0.0703px] translate-x-[-50%] whitespace-pre">5.2</p>
    </div>
  );
}

function Container34() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-[25px] not-italic text-[#a0a9b8] text-[12px] text-center text-nowrap top-px translate-x-[-50%] whitespace-pre">KP Index</p>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col h-[48px] items-start relative shrink-0 w-[49.406px]" data-name="Container">
      <Container33 />
      <Container34 />
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[10px] items-start left-[calc(50%+0.5px)] px-[39px] py-[40px] size-[128px] top-0 translate-x-[-50%]" data-name="Container">
      <Icon15 />
      <Container35 />
    </div>
  );
}

function Badge1() {
  return (
    <div className="absolute h-[22px] left-[calc(50%+0.129px)] rounded-[8px] top-[144px] translate-x-[-50%] w-[89.258px]" data-name="Badge">
      <div className="box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[89.258px]">
        <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#ff8904] text-[12px] text-nowrap whitespace-pre">Minor Storm</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(218,218,218,0.53)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function KpIndexGauge() {
  return (
    <div className="absolute h-[203px] left-[22px] top-[95px] w-[233px]" data-name="KPIndexGauge">
      <Container36 />
      <Badge1 />
    </div>
  );
}

function Card() {
  return (
    <div className="absolute bg-gray-50 h-[338px] left-0 rounded-[14px] top-0 w-[289px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(218,218,218,0.53)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CardTitle />
      <KpIndexGauge />
    </div>
  );
}

function Frame2() {
  return (
    <div className="[grid-area:1_/_1] relative shrink-0 w-[289px]">
      <Card />
    </div>
  );
}

function Icon16() {
  return (
    <div className="absolute left-0 size-[20px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p15cb5380} id="Vector" stroke="var(--stroke-0, #4FC3F7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2021cec0} id="Vector_2" stroke="var(--stroke-0, #4FC3F7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p103aa100} id="Vector_3" stroke="var(--stroke-0, #4FC3F7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function CardTitle1() {
  return (
    <div className="absolute h-[20px] left-[25px] top-[25px] w-[485.336px]" data-name="CardTitle">
      <Icon16 />
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-[28px] not-italic text-[#6a6a6a] text-[16px] text-nowrap top-[1.5px] tracking-[-0.3125px] whitespace-pre">Solar Wind Parameters</p>
    </div>
  );
}

function Text20() {
  return (
    <div className="h-[20px] relative shrink-0 w-[41.313px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[41.313px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#a0a9b8] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Speed</p>
      </div>
    </div>
  );
}

function Text21() {
  return (
    <div className="h-[28px] relative shrink-0 w-[89.742px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[89.742px]">
        <p className="absolute font-['Inter:Bold',_sans-serif] font-bold leading-[28px] left-[-17.42px] not-italic text-[#4fc3f7] text-[20px] top-0 tracking-[-0.4492px] w-[107px]">489 km/s</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex h-[28px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text20 />
      <Text21 />
    </div>
  );
}

function Container38() {
  return <div className="bg-[#4fc3f7] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv1() {
  return (
    <div className="bg-[#4fc3f7] box-border content-stretch flex flex-col h-[8px] items-start overflow-clip pr-[89.671px] py-0 relative rounded-[1.67772e+07px] shrink-0 w-full" data-name="Primitive.div">
      <Container38 />
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[44px] items-start left-0 top-0 w-[230.664px]" data-name="Container">
      <Container37 />
      <PrimitiveDiv1 />
    </div>
  );
}

function Text22() {
  return (
    <div className="h-[20px] relative shrink-0 w-[48.766px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[48.766px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#a0a9b8] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Density</p>
      </div>
    </div>
  );
}

function Text23() {
  return (
    <div className="h-[28px] relative shrink-0 w-[146px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[146px]">
        <p className="absolute font-['Inter:Bold',_sans-serif] font-bold leading-[28px] left-[0.16px] not-italic text-[#ff8a65] text-[20px] top-0 tracking-[-0.4492px] w-[146px]">10.9 p/cm³</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex h-[28px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text22 />
      <Text23 />
    </div>
  );
}

function Container41() {
  return <div className="bg-[#4fc3f7] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv2() {
  return (
    <div className="bg-[#4fc3f7] box-border content-stretch flex flex-col h-[8px] items-start overflow-clip pr-[104.956px] py-0 relative rounded-[1.67772e+07px] shrink-0 w-full" data-name="Primitive.div">
      <Container41 />
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[44px] items-start left-[254.66px] top-0 w-[230.672px]" data-name="Container">
      <Container40 />
      <PrimitiveDiv2 />
    </div>
  );
}

function SpaceWeatherDashboard() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="SpaceWeatherDashboard">
      <Container39 />
      <Container42 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[78.13%_83.09%_9.68%_9.9%]" data-name="Group">
      <div className="absolute inset-[78.13%_86.6%_18.13%_13.4%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M1 6V0" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal inset-[80.95%_83.09%_9.68%_9.9%] leading-[normal] not-italic text-[12px] text-black text-center">00:00</p>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[78.13%_72.64%_9.68%_20.35%]" data-name="Group">
      <div className="absolute inset-[78.13%_76.14%_18.13%_23.86%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M1 6V0" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal inset-[80.95%_72.64%_9.68%_20.35%] leading-[normal] not-italic text-[12px] text-black text-center">03:00</p>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents inset-[78.13%_62.18%_9.68%_30.81%]" data-name="Group">
      <div className="absolute inset-[78.13%_65.69%_18.13%_34.31%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M1 6V0" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal inset-[80.95%_62.18%_9.68%_30.81%] leading-[normal] not-italic text-[12px] text-black text-center">06:00</p>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents inset-[78.13%_51.72%_9.68%_41.27%]" data-name="Group">
      <div className="absolute inset-[78.13%_55.23%_18.13%_44.77%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M1 6V0" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal inset-[80.95%_51.72%_9.68%_41.27%] leading-[normal] not-italic text-[12px] text-black text-center">09:00</p>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents inset-[78.13%_41.47%_9.68%_51.93%]" data-name="Group">
      <div className="absolute inset-[78.13%_44.77%_18.13%_55.23%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M1 6V0" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal inset-[80.95%_41.47%_9.68%_51.93%] leading-[normal] not-italic text-[12px] text-black text-center">12:00</p>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents inset-[78.13%_31.02%_9.68%_62.39%]" data-name="Group">
      <div className="absolute inset-[78.13%_34.31%_18.13%_65.69%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M1 6V0" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal inset-[80.95%_31.02%_9.68%_62.39%] leading-[normal] not-italic text-[12px] text-black text-center">15:00</p>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents inset-[78.13%_20.56%_9.68%_72.84%]" data-name="Group">
      <div className="absolute inset-[78.13%_23.86%_18.13%_76.14%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M1 6V0" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal inset-[80.95%_20.56%_9.68%_72.84%] leading-[normal] not-italic text-[12px] text-black text-center">18:00</p>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents inset-[78.13%_10.1%_9.68%_83.3%]" data-name="Group">
      <div className="absolute inset-[78.13%_13.4%_18.13%_86.6%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M1 6V0" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal inset-[80.95%_10.1%_9.68%_83.3%] leading-[normal] not-italic text-[12px] text-black text-center">21:00</p>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents inset-[78.13%_10.1%_9.68%_9.9%]" data-name="Group">
      <Group />
      <Group1 />
      <Group2 />
      <Group3 />
      <Group4 />
      <Group5 />
      <Group6 />
      <Group7 />
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents inset-[78.13%_10.1%_9.68%_9.9%]" data-name="Group">
      <div className="absolute inset-[78.13%_13.4%_21.88%_13.4%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 356 2">
            <path d="M0 1H355.246" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <Group8 />
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute contents inset-[73.29%_86.6%_17.34%_10.1%]" data-name="Group">
      <div className="absolute inset-[78.13%_86.6%_21.88%_12.16%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 2">
            <path d="M0 1H6.00416" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal inset-[73.29%_88.25%_17.34%_10.1%] leading-[normal] not-italic text-[12px] text-black text-right">0</p>
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute contents inset-[54.54%_86.6%_36.09%_7.42%]" data-name="Group">
      <div className="absolute inset-[59.38%_86.6%_40.63%_12.16%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 2">
            <path d="M0 1H6.00416" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal inset-[54.54%_88.25%_36.09%_7.42%] leading-[normal] not-italic text-[12px] text-black text-right">150</p>
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute contents inset-[35.79%_86.6%_54.84%_7.01%]" data-name="Group">
      <div className="absolute inset-[40.63%_86.6%_59.38%_12.16%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 2">
            <path d="M0 1H6.00416" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal inset-[35.79%_88.25%_54.84%_7.01%] leading-[normal] not-italic text-[12px] text-black text-right">300</p>
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute contents inset-[17.04%_86.6%_73.59%_7.01%]" data-name="Group">
      <div className="absolute inset-[21.88%_86.6%_78.13%_12.16%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 2">
            <path d="M0 1H6.00416" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal inset-[17.04%_88.25%_73.59%_7.01%] leading-[normal] not-italic text-[12px] text-black text-right">450</p>
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute contents inset-[0.79%_86.6%_89.84%_7.01%]" data-name="Group">
      <div className="absolute inset-[3.13%_86.6%_96.88%_12.16%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 2">
            <path d="M0 1H6.00416" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal inset-[0.79%_88.25%_89.84%_7.01%] leading-[normal] not-italic text-[12px] text-black text-right">600</p>
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute contents inset-[0.79%_86.6%_17.34%_7.01%]" data-name="Group">
      <Group10 />
      <Group11 />
      <Group12 />
      <Group13 />
      <Group14 />
    </div>
  );
}

function Group16() {
  return (
    <div className="absolute contents inset-[0.79%_86.6%_17.34%_7.01%]" data-name="Group">
      <div className="absolute inset-[3.13%_86.6%_21.88%_13.4%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 120">
            <path d="M1 0V120" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <Group15 />
    </div>
  );
}

function Group17() {
  return (
    <div className="absolute contents inset-[73.29%_10.1%_17.34%_86.6%]" data-name="Group">
      <div className="absolute inset-[78.13%_12.16%_21.88%_86.6%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 2">
            <path d="M6.00416 1H0" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal inset-[73.29%_10.1%_17.34%_88.25%] leading-[normal] not-italic text-[12px] text-black">0</p>
    </div>
  );
}

function Group18() {
  return (
    <div className="absolute contents inset-[54.54%_10.1%_36.09%_86.6%]" data-name="Group">
      <div className="absolute inset-[59.38%_12.16%_40.63%_86.6%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 2">
            <path d="M6.00416 1H0" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal inset-[54.54%_10.1%_36.09%_88.25%] leading-[normal] not-italic text-[12px] text-black">4</p>
    </div>
  );
}

function Group19() {
  return (
    <div className="absolute contents inset-[35.79%_10.1%_54.84%_86.6%]" data-name="Group">
      <div className="absolute inset-[40.63%_12.16%_59.38%_86.6%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 2">
            <path d="M6.00416 1H0" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal inset-[35.79%_10.1%_54.84%_88.25%] leading-[normal] not-italic text-[12px] text-black">8</p>
    </div>
  );
}

function Group20() {
  return (
    <div className="absolute contents inset-[17.04%_9.07%_73.59%_86.6%]" data-name="Group">
      <div className="absolute inset-[21.88%_12.16%_78.13%_86.6%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 2">
            <path d="M6.00416 1H0" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal inset-[17.04%_9.07%_73.59%_88.25%] leading-[normal] not-italic text-[12px] text-black">12</p>
    </div>
  );
}

function Group21() {
  return (
    <div className="absolute contents inset-[0.79%_8.87%_89.84%_86.6%]" data-name="Group">
      <div className="absolute inset-[3.13%_12.16%_96.88%_86.6%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 2">
            <path d="M6.00416 1H0" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal inset-[0.79%_8.87%_89.84%_88.25%] leading-[normal] not-italic text-[12px] text-black">16</p>
    </div>
  );
}

function Group22() {
  return (
    <div className="absolute contents inset-[0.79%_8.87%_17.34%_86.6%]" data-name="Group">
      <Group17 />
      <Group18 />
      <Group19 />
      <Group20 />
      <Group21 />
    </div>
  );
}

function Group23() {
  return (
    <div className="absolute contents inset-[0.79%_8.87%_17.34%_86.6%]" data-name="Group">
      <div className="absolute inset-[3.13%_13.4%_21.88%_86.6%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 120">
            <path d="M1 0V120" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <Group22 />
    </div>
  );
}

function Group24() {
  return (
    <div className="absolute contents inset-[17%_13.4%_21.88%_13.4%]" data-name="Group">
      <div className="absolute inset-[17%_13.4%_21.88%_13.4%]" data-name="recharts-area-:r14:">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 356 98">
          <path d={svgPaths.p10ea4e00} fill="var(--fill-0, #00F5FF)" fillOpacity="0.2" id="recharts-area-:r14:" />
        </svg>
      </div>
      <div className="absolute inset-[17%_13.4%_74.38%_13.4%]" data-name="Vector">
        <div className="absolute inset-[-3.62%_-0.02%_-3.62%_-0.01%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 357 16">
            <path d={svgPaths.p2a373d80} id="Vector" stroke="var(--stroke-0, #00F5FF)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group25() {
  return (
    <div className="absolute contents inset-[17%_13.4%_21.88%_13.4%]" data-name="Group">
      <Group24 />
    </div>
  );
}

function Group26() {
  return (
    <div className="absolute contents inset-[18.59%_13.4%_58.44%_13.4%]" data-name="Group">
      <div className="absolute inset-[18.59%_13.4%_58.44%_13.4%]" data-name="recharts-line-:r15:">
        <div className="absolute inset-[-2.72%_-0.02%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 357 39">
            <path d={svgPaths.p3c2f1b80} id="recharts-line-:r15:" stroke="var(--stroke-0, #FF6B35)" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon17() {
  return (
    <div className="h-[160px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Group9 />
      <Group16 />
      <Group23 />
      <Group25 />
      <Group26 />
    </div>
  );
}

function SpaceWeatherDashboard1() {
  return (
    <div className="content-stretch flex flex-col h-[160px] items-start relative shrink-0 w-full" data-name="SpaceWeatherDashboard">
      <Icon17 />
    </div>
  );
}

function CardContent() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[24px] h-[252px] items-start left-px px-[24px] py-0 top-[91px] w-[533.336px]" data-name="CardContent">
      <SpaceWeatherDashboard />
      <SpaceWeatherDashboard1 />
    </div>
  );
}

function Card1() {
  return (
    <div className="[grid-area:1_/_2] bg-gray-50 h-[344px] relative rounded-[14px] shrink-0 w-[556px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(218,218,218,0.53)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CardTitle1 />
      <CardContent />
    </div>
  );
}

function Icon18() {
  return (
    <div className="absolute left-0 size-[20px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_13849)" id="Icon">
          <path d={svgPaths.p20d10600} id="Vector" stroke="var(--stroke-0, #FDC700)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 1.66667V3.33333" id="Vector_2" stroke="var(--stroke-0, #FDC700)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 16.6667V18.3333" id="Vector_3" stroke="var(--stroke-0, #FDC700)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2561cd80} id="Vector_4" stroke="var(--stroke-0, #FDC700)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p13560080} id="Vector_5" stroke="var(--stroke-0, #FDC700)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M1.66667 10H3.33333" id="Vector_6" stroke="var(--stroke-0, #FDC700)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M16.6667 10H18.3333" id="Vector_7" stroke="var(--stroke-0, #FDC700)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1804e640} id="Vector_8" stroke="var(--stroke-0, #FDC700)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p18688e80} id="Vector_9" stroke="var(--stroke-0, #FDC700)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_1_13849">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CardTitle2() {
  return (
    <div className="absolute h-[20px] left-[25px] top-[25px] w-[205.664px]" data-name="CardTitle">
      <Icon18 />
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-[28px] not-italic text-[#6a6a6a] text-[16px] text-nowrap top-[1.5px] tracking-[-0.3125px] whitespace-pre">Solar Activity</p>
    </div>
  );
}

function Text24() {
  return (
    <div className="h-[20px] relative shrink-0 w-[77.508px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[77.508px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#a0a9b8] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">X-Ray Class</p>
      </div>
    </div>
  );
}

function Badge2() {
  return (
    <div className="h-[22px] relative rounded-[8px] shrink-0 w-[43.047px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[43.047px]">
        <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#fdc700] text-[12px] text-nowrap whitespace-pre">C2.1</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(218,218,218,0.53)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function SpaceWeatherDashboard2() {
  return (
    <div className="content-stretch flex h-[22px] items-center justify-between relative shrink-0 w-[205.664px]" data-name="SpaceWeatherDashboard">
      <Text24 />
      <Badge2 />
    </div>
  );
}

function Text25() {
  return (
    <div className="h-[20px] relative shrink-0 w-[95.383px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[95.383px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#a0a9b8] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Active Regions</p>
      </div>
    </div>
  );
}

function Text26() {
  return (
    <div className="h-[24px] relative shrink-0 w-[9.359px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[9.359px]">
        <p className="absolute font-['Inter:Bold',_sans-serif] font-bold leading-[24px] left-0 not-italic text-[#6a6a6a] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">7</p>
      </div>
    </div>
  );
}

function SpaceWeatherDashboard3() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-[197px]" data-name="SpaceWeatherDashboard">
      <Text25 />
      <Text26 />
    </div>
  );
}

function Text27() {
  return (
    <div className="h-[20px] relative shrink-0 w-[62.375px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[62.375px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#a0a9b8] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Flare Risk</p>
      </div>
    </div>
  );
}

function Badge3() {
  return (
    <div className="h-[22px] relative rounded-[8px] shrink-0 w-[73.297px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[73.297px]">
        <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#ff8904] text-[12px] text-nowrap whitespace-pre">Moderate</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(218,218,218,0.53)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function SpaceWeatherDashboard4() {
  return (
    <div className="content-stretch flex h-[22px] items-center justify-between relative shrink-0 w-full" data-name="SpaceWeatherDashboard">
      <Text27 />
      <Badge3 />
    </div>
  );
}

function Text28() {
  return (
    <div className="h-[20px] relative shrink-0 w-[82.008px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[82.008px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#a0a9b8] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">CME Activity</p>
      </div>
    </div>
  );
}

function Badge4() {
  return (
    <div className="h-[22px] relative rounded-[8px] shrink-0 w-[41.18px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[41.18px]">
        <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#05df72] text-[12px] text-nowrap whitespace-pre">Low</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(218,218,218,0.53)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function SpaceWeatherDashboard5() {
  return (
    <div className="content-stretch flex h-[22px] items-center justify-between relative shrink-0 w-full" data-name="SpaceWeatherDashboard">
      <Text28 />
      <Badge4 />
    </div>
  );
}

function CardContent1() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[16px] h-[162px] items-start left-[calc(50%+0.332px)] px-[24px] py-0 top-[91px] translate-x-[-50%] w-[253.664px]" data-name="CardContent">
      <SpaceWeatherDashboard2 />
      <SpaceWeatherDashboard3 />
      <SpaceWeatherDashboard4 />
      <SpaceWeatherDashboard5 />
    </div>
  );
}

function Card2() {
  return (
    <div className="[grid-area:2_/_1] bg-gray-50 relative rounded-[14px] shrink-0 w-[289px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(218,218,218,0.53)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CardTitle2 />
      <CardContent1 />
    </div>
  );
}

function Icon19() {
  return (
    <div className="absolute left-0 size-[20px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_12815)" id="Icon">
          <path d={svgPaths.p363df2c0} id="Vector" stroke="var(--stroke-0, #4FC3F7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_1_12815">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CardTitle3() {
  return (
    <div className="absolute h-[20px] left-[25px] top-[25px] w-[485.336px]" data-name="CardTitle">
      <Icon19 />
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-[28px] not-italic text-[#6a6a6a] text-[16px] text-nowrap top-[1.5px] tracking-[-0.3125px] whitespace-pre">24-Hour KP Index Trend</p>
    </div>
  );
}

function Group27() {
  return (
    <div className="absolute contents inset-[78.13%_83.09%_9.68%_9.9%]" data-name="Group">
      <div className="absolute inset-[78.13%_86.6%_18.13%_13.4%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M1 6V0" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal inset-[80.95%_83.09%_9.68%_9.9%] leading-[normal] not-italic text-[12px] text-black text-center">00:00</p>
    </div>
  );
}

function Group28() {
  return (
    <div className="absolute contents inset-[78.13%_70.87%_9.68%_22.12%]" data-name="Group">
      <div className="absolute inset-[78.13%_74.37%_18.13%_25.63%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M1 6V0" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal inset-[80.95%_70.87%_9.68%_22.12%] leading-[normal] not-italic text-[12px] text-black text-center">03:00</p>
    </div>
  );
}

function Group29() {
  return (
    <div className="absolute contents inset-[78.13%_58.65%_9.68%_34.34%]" data-name="Group">
      <div className="absolute inset-[78.13%_62.15%_18.13%_37.85%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M1 6V0" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal inset-[80.95%_58.65%_9.68%_34.34%] leading-[normal] not-italic text-[12px] text-black text-center">06:00</p>
    </div>
  );
}

function Group30() {
  return (
    <div className="absolute contents inset-[78.13%_46.42%_9.68%_46.57%]" data-name="Group">
      <div className="absolute inset-[78.13%_49.93%_18.13%_50.07%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M1 6V0" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal inset-[80.95%_46.42%_9.68%_46.57%] leading-[normal] not-italic text-[12px] text-black text-center">09:00</p>
    </div>
  );
}

function Group31() {
  return (
    <div className="absolute contents inset-[78.13%_34.4%_9.68%_59%]" data-name="Group">
      <div className="absolute inset-[78.13%_37.7%_18.13%_62.3%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M1 6V0" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal inset-[80.95%_34.4%_9.68%_59%] leading-[normal] not-italic text-[12px] text-black text-center">12:00</p>
    </div>
  );
}

function Group32() {
  return (
    <div className="absolute contents inset-[78.13%_22.18%_9.68%_71.22%]" data-name="Group">
      <div className="absolute inset-[78.13%_25.48%_18.13%_74.52%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M1 6V0" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal inset-[80.95%_22.18%_9.68%_71.22%] leading-[normal] not-italic text-[12px] text-black text-center">15:00</p>
    </div>
  );
}

function Group33() {
  return (
    <div className="absolute contents inset-[78.13%_9.96%_9.68%_83.45%]" data-name="Group">
      <div className="absolute inset-[78.13%_13.26%_18.13%_86.75%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M1 6V0" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal inset-[80.95%_9.96%_9.68%_83.45%] leading-[normal] not-italic text-[12px] text-black text-center">18:00</p>
    </div>
  );
}

function Group34() {
  return (
    <div className="absolute contents inset-[78.13%_-0.05%_9.68%_93.45%]" data-name="Group">
      <div className="absolute inset-[78.13%_1.03%_18.13%_98.97%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M1 6V0" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal inset-[80.95%_-0.05%_9.68%_93.45%] leading-[normal] not-italic text-[12px] text-black text-center">21:00</p>
    </div>
  );
}

function Group35() {
  return (
    <div className="absolute contents inset-[78.13%_-0.05%_9.68%_9.9%]" data-name="Group">
      <Group27 />
      <Group28 />
      <Group29 />
      <Group30 />
      <Group31 />
      <Group32 />
      <Group33 />
      <Group34 />
    </div>
  );
}

function Group36() {
  return (
    <div className="absolute contents inset-[78.13%_-0.05%_9.68%_9.9%]" data-name="Group">
      <div className="absolute inset-[78.13%_1.03%_21.88%_13.4%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 415 2">
            <path d="M0 1H414.713" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <Group35 />
    </div>
  );
}

function Group37() {
  return (
    <div className="absolute contents inset-[73.29%_86.6%_17.34%_10.1%]" data-name="Group">
      <div className="absolute inset-[78.13%_86.6%_21.88%_12.16%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 2">
            <path d="M0 1H5.99584" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal inset-[73.29%_88.25%_17.34%_10.1%] leading-[normal] not-italic text-[12px] text-black text-right">0</p>
    </div>
  );
}

function Group38() {
  return (
    <div className="absolute contents inset-[48.29%_86.6%_42.34%_10.1%]" data-name="Group">
      <div className="absolute inset-[53.13%_86.6%_46.88%_12.16%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 2">
            <path d="M0 1H5.99584" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal inset-[48.29%_88.25%_42.34%_10.1%] leading-[normal] not-italic text-[12px] text-black text-right">3</p>
    </div>
  );
}

function Group39() {
  return (
    <div className="absolute contents inset-[23.29%_86.6%_67.34%_10.1%]" data-name="Group">
      <div className="absolute inset-[28.13%_86.6%_71.88%_12.16%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 2">
            <path d="M0 1H5.99584" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal inset-[23.29%_88.25%_67.34%_10.1%] leading-[normal] not-italic text-[12px] text-black text-right">6</p>
    </div>
  );
}

function Group40() {
  return (
    <div className="absolute contents inset-[0.79%_86.6%_89.84%_10.1%]" data-name="Group">
      <div className="absolute inset-[3.13%_86.6%_96.88%_12.16%]" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 2">
            <path d="M0 1H5.99584" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal inset-[0.79%_88.25%_89.84%_10.1%] leading-[normal] not-italic text-[12px] text-black text-right">9</p>
    </div>
  );
}

function Group41() {
  return (
    <div className="absolute contents inset-[0.79%_86.6%_17.34%_10.1%]" data-name="Group">
      <Group37 />
      <Group38 />
      <Group39 />
      <Group40 />
    </div>
  );
}

function Group42() {
  return (
    <div className="absolute contents inset-[0.79%_86.6%_17.34%_10.1%]" data-name="Group">
      <div className="absolute inset-[3.13%_86.6%_21.88%_13.4%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 120">
            <path d="M1 0V120" id="Vector" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <Group41 />
    </div>
  );
}

function Group43() {
  return (
    <div className="absolute contents inset-[32.29%_0.21%_36.88%_12.58%]" data-name="Group">
      <div className="absolute inset-[58.13%_85.77%_36.88%_12.58%]" data-name="Vector">
        <div className="absolute inset-[-12.5%_-12.51%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <path d={svgPaths.p3a253e00} fill="var(--fill-0, #00F5FF)" id="Vector" stroke="var(--stroke-0, #00F5FF)" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[52.29%_73.55%_42.71%_24.8%]" data-name="Vector">
        <div className="absolute inset-[-12.5%_-12.51%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <path d={svgPaths.p1defc580} fill="var(--fill-0, #00F5FF)" id="Vector" stroke="var(--stroke-0, #00F5FF)" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[48.96%_61.33%_46.04%_37.02%]" data-name="Vector">
        <div className="absolute inset-[-12.5%_-12.51%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <path d={svgPaths.p3a253e00} fill="var(--fill-0, #00F5FF)" id="Vector" stroke="var(--stroke-0, #00F5FF)" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[41.46%_49.1%_53.54%_49.25%]" data-name="Vector">
        <div className="absolute inset-[-12.5%_-12.51%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <path d={svgPaths.p3a253e00} fill="var(--fill-0, #00F5FF)" id="Vector" stroke="var(--stroke-0, #00F5FF)" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[35.63%_36.88%_59.38%_61.47%]" data-name="Vector">
        <div className="absolute inset-[-12.5%_-12.51%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <path d={svgPaths.p3a253e00} fill="var(--fill-0, #00F5FF)" id="Vector" stroke="var(--stroke-0, #00F5FF)" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[32.29%_24.65%_62.71%_73.7%]" data-name="Vector">
        <div className="absolute inset-[-12.5%_-12.51%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <path d={svgPaths.p3a253e00} fill="var(--fill-0, #00F5FF)" id="Vector" stroke="var(--stroke-0, #00F5FF)" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[34.79%_12.43%_60.21%_85.92%]" data-name="Vector">
        <div className="absolute inset-[-12.5%_-12.51%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <path d={svgPaths.p3a253e00} fill="var(--fill-0, #00F5FF)" id="Vector" stroke="var(--stroke-0, #00F5FF)" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[44.79%_0.21%_50.21%_98.14%]" data-name="Vector">
        <div className="absolute inset-[-12.5%_-12.51%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <path d={svgPaths.p3a253e00} fill="var(--fill-0, #00F5FF)" id="Vector" stroke="var(--stroke-0, #00F5FF)" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group44() {
  return (
    <div className="absolute contents inset-[32.29%_0.21%_36.88%_12.58%]" data-name="Group">
      <div className="absolute inset-[34.79%_1.03%_39.38%_13.4%]" data-name="recharts-line-:r16:">
        <div className="absolute inset-[-3.63%_-0.12%_-3.58%_-0.06%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 417 45">
            <path d={svgPaths.p38b2b400} id="recharts-line-:r16:" stroke="var(--stroke-0, #00F5FF)" strokeWidth="3" />
          </svg>
        </div>
      </div>
      <Group43 />
    </div>
  );
}

function Icon20() {
  return (
    <div className="h-[160px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Group36 />
      <Group42 />
      <Group44 />
    </div>
  );
}

function SpaceWeatherDashboard6() {
  return (
    <div className="content-stretch flex flex-col h-[160px] items-start relative shrink-0 w-full" data-name="SpaceWeatherDashboard">
      <Icon20 />
    </div>
  );
}

function Text29() {
  return (
    <div className="h-[16px] relative shrink-0 w-[57.844px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[57.844px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#a0a9b8] text-[12px] text-nowrap top-px whitespace-pre">0-2: Quiet</p>
      </div>
    </div>
  );
}

function Text30() {
  return (
    <div className="h-[16px] relative shrink-0 w-[82.813px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[82.813px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#a0a9b8] text-[12px] text-nowrap top-px whitespace-pre">3-4: Unsettled</p>
      </div>
    </div>
  );
}

function Text31() {
  return (
    <div className="h-[16px] relative shrink-0 w-[97.289px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[97.289px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#a0a9b8] text-[12px] text-nowrap top-px whitespace-pre">5-6: Minor Storm</p>
      </div>
    </div>
  );
}

function Text32() {
  return (
    <div className="h-[16px] relative shrink-0 w-[96.336px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[96.336px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#a0a9b8] text-[12px] text-nowrap top-px whitespace-pre">7-8: Major Storm</p>
      </div>
    </div>
  );
}

function Text33() {
  return (
    <div className="h-[16px] relative shrink-0 w-[90.852px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[90.852px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#a0a9b8] text-[12px] text-nowrap top-px whitespace-pre">9: Severe Storm</p>
      </div>
    </div>
  );
}

function SpaceWeatherDashboard7() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="SpaceWeatherDashboard">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[16px] items-center justify-between pl-0 pr-[0.016px] py-0 relative w-full">
          <Text29 />
          <Text30 />
          <Text31 />
          <Text32 />
          <Text33 />
        </div>
      </div>
    </div>
  );
}

function CardContent2() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[16px] h-[243px] items-start left-px pl-[24px] pr-[24.336px] py-0 top-[107.67px] w-[533px]" data-name="CardContent">
      <SpaceWeatherDashboard6 />
      <SpaceWeatherDashboard7 />
    </div>
  );
}

function Card3() {
  return (
    <div className="[grid-area:2_/_2] bg-gray-50 relative rounded-[14px] shrink-0 w-[556px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(218,218,218,0.53)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CardTitle3 />
      <CardContent2 />
    </div>
  );
}

function Icon21() {
  return (
    <div className="absolute left-0 size-[20px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p8e86300} id="Vector" stroke="var(--stroke-0, #FF8A65)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function CardTitle4() {
  return (
    <div className="absolute h-[20px] left-[25px] top-[25px] w-[205.664px]" data-name="CardTitle">
      <Icon21 />
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-[28px] not-italic text-[#6a6a6a] text-[16px] text-nowrap top-[1.5px] tracking-[-0.3125px] whitespace-pre">Radiation Environment</p>
    </div>
  );
}

function Text34() {
  return (
    <div className="h-[20px] relative shrink-0 w-[83.555px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[83.555px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#a0a9b8] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Electron Flux</p>
      </div>
    </div>
  );
}

function Badge5() {
  return (
    <div className="h-[22px] relative rounded-[8px] shrink-0 w-[59.773px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[59.773px]">
        <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#05df72] text-[12px] text-nowrap whitespace-pre">Normal</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(218,218,218,0.53)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function SpaceWeatherDashboard8() {
  return (
    <div className="content-stretch flex h-[22px] items-center justify-between relative shrink-0 w-full" data-name="SpaceWeatherDashboard">
      <Text34 />
      <Badge5 />
    </div>
  );
}

function Text35() {
  return (
    <div className="h-[20px] relative shrink-0 w-[73.063px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[73.063px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#a0a9b8] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Proton Flux</p>
      </div>
    </div>
  );
}

function Badge6() {
  return (
    <div className="h-[22px] relative rounded-[8px] shrink-0 w-[67.492px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[67.492px]">
        <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#fdc700] text-[12px] text-nowrap whitespace-pre">Elevated</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(218,218,218,0.53)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function SpaceWeatherDashboard9() {
  return (
    <div className="content-stretch flex h-[22px] items-center justify-between relative shrink-0 w-full" data-name="SpaceWeatherDashboard">
      <Text35 />
      <Badge6 />
    </div>
  );
}

function Text36() {
  return (
    <div className="h-[20px] relative shrink-0 w-[65.648px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[65.648px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#a0a9b8] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">SEP Event</p>
      </div>
    </div>
  );
}

function Badge7() {
  return (
    <div className="h-[22px] relative rounded-[8px] shrink-0 w-[48.375px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[48.375px]">
        <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#05df72] text-[12px] text-nowrap whitespace-pre">None</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(218,218,218,0.53)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function SpaceWeatherDashboard10() {
  return (
    <div className="content-stretch flex h-[22px] items-center justify-between relative shrink-0 w-full" data-name="SpaceWeatherDashboard">
      <Text36 />
      <Badge7 />
    </div>
  );
}

function Container43() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#a0a9b8] text-[12px] text-nowrap top-px whitespace-pre">Alert Level</p>
    </div>
  );
}

function Icon22() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p293dc0c0} id="Vector" stroke="var(--stroke-0, #FDC700)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 6V8.66667" id="Vector_2" stroke="var(--stroke-0, #FDC700)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 11.3333H8.00667" id="Vector_3" stroke="var(--stroke-0, #FDC700)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text37() {
  return (
    <div className="h-[20px] relative shrink-0 w-[41.797px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[41.797px]">
        <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-0 not-italic text-[#fdc700] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Watch</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon22 />
      <Text37 />
    </div>
  );
}

function SpaceWeatherDashboard11() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8px] h-[52px] items-start pb-0 pt-[8px] px-0 relative shrink-0 w-full" data-name="SpaceWeatherDashboard">
      <Container43 />
      <Container44 />
    </div>
  );
}

function CardContent3() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[16px] h-[190px] items-start left-[calc(50%+0.5px)] px-[24px] py-0 top-[91.33px] translate-x-[-50%] w-[264px]" data-name="CardContent">
      <SpaceWeatherDashboard8 />
      <SpaceWeatherDashboard9 />
      <SpaceWeatherDashboard10 />
      <SpaceWeatherDashboard11 />
    </div>
  );
}

function Card4() {
  return (
    <div className="[grid-area:3_/_1] bg-gray-50 h-[282px] relative rounded-[14px] shrink-0 w-[289px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(218,218,218,0.53)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CardTitle4 />
      <CardContent3 />
    </div>
  );
}

function Container45() {
  return (
    <div className="absolute gap-[170px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(3,_minmax(0px,_1fr))] h-[1151px] left-[337px] top-[351px] w-[638px]" data-name="Container">
      <Frame2 />
      <Card1 />
      <Card2 />
      <Card3 />
      <Card4 />
    </div>
  );
}

export default function AstroAlertUiRedesign() {
  return (
    <div className="bg-[#0f1419] relative size-full" data-name="AstroAlert UI Redesign">
      <App />
      <Text16 />
      <Container32 />
      <Container45 />
    </div>
  );
}