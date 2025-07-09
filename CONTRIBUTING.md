# Contributing to AstroAlert

Thank you for your interest in contributing to AstroAlert! We welcome all contributions, including bug reports, feature requests, documentation improvements, and code contributions.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Your First Code Contribution](#your-first-code-contribution)
  - [Pull Requests](#pull-requests)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Code Review Process](#code-review-process)
- [Community](#community)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How to Contribute

### Reporting Bugs

Bugs are tracked as [GitHub issues](https://github.com/yourusername/astroalert/issues). Before creating a new issue:

1. **Check if the issue has already been reported** by searching under [Issues](https://github.com/yourusername/astroalert/issues).
2. If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/yourusername/astroalert/issues/new). Be sure to include:
   - A clear and descriptive title
   - A description of the expected behavior
   - A description of the actual behavior
   - Steps to reproduce the issue
   - Any relevant logs or screenshots
   - Your environment details (OS, Python version, etc.)

### Suggesting Enhancements

Enhancement suggestions are also tracked as [GitHub issues](https://github.com/yourusername/astroalert/issues). When creating an enhancement suggestion:

1. Use a **clear and descriptive title** for the issue.
2. Provide a **detailed description** of the suggested enhancement.
3. Explain why this enhancement would be useful.
4. List any alternative solutions or features you've considered.
5. If applicable, include any screenshots or mockups.

### Your First Code Contribution

1. **Fork the repository** on GitHub.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/astroalert.git
   cd astroalert
   ```
3. **Set up the development environment** (see [Development Setup](#development-setup)).
4. **Create a new branch** for your changes:
   ```bash
   git checkout -b my-feature-branch
   ```
5. **Make your changes** following the [coding standards](#coding-standards).
6. **Write tests** for your changes (if applicable).
7. **Run the test suite** to ensure everything still passes.
8. **Commit your changes** with a clear and descriptive commit message.
9. **Push your changes** to your fork:
   ```bash
   git push origin my-feature-branch
   ```
10. **Open a Pull Request** (see [Pull Requests](#pull-requests)).

### Pull Requests

1. Ensure any install or build dependencies are removed before the end of the layer when doing a build.
2. Update the README.md with details of changes to the interface, including new environment variables, exposed ports, useful file locations, and container parameters.
3. Increase the version numbers in any example files and the README.md to the new version that this Pull Request would represent. The versioning scheme we use is [SemVer](http://semver.org/).
4. Your pull request should address a single issue and contain a clear list of what you've done. Make sure all of your commits are atomic (one feature per commit).
5. Ensure the test suite passes and that your code passes our linting and type checking.
6. If your PR changes the API or adds significant functionality, update the relevant documentation.

## Development Setup

### Prerequisites

- Python 3.9+
- Docker and Docker Compose
- Poetry (for dependency management)

### Setup Instructions

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/yourusername/astroalert.git
   cd astroalert
   ```

2. **Set up the virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements-dev.txt
   ```

4. **Set up pre-commit hooks**
   ```bash
   pre-commit install
   ```

5. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

6. **Start the development services**
   ```bash
   docker-compose up -d redis postgres
   ```

7. **Run database migrations**
   ```bash
   alembic upgrade head
   ```

8. **Start the development server**
   ```bash
   uvicorn app.main:app --reload
   ```

## Coding Standards

- **Code Style**: We use [Black](https://github.com/psf/black) for code formatting and [isort](https://pycqa.github.io/isort/) for import sorting.
- **Type Hints**: All new code should include Python type hints.
- **Docstrings**: Follow the Google style docstring format.
- **Commit Messages**: Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

## Testing

We use `pytest` for testing. To run the tests:

```bash
# Run all tests
pytest

# Run tests with coverage
pytest --cov=app --cov-report=term-missing

# Run a specific test file
pytest tests/path/to/test_file.py

# Run a specific test function
pytest tests/path/to/test_file.py::test_function_name
```

## Documentation

- Update the relevant documentation when making changes to the codebase.
- Follow the existing documentation style.
- Ensure all new features are documented.
- Update the CHANGELOG.md with any notable changes.

## Code Review Process

1. A maintainer will review your PR and provide feedback.
2. The PR may go through several iterations of feedback and changes.
3. Once the PR is approved, a maintainer will merge it into the main branch.

## Community

- Join our [Discord server](https://discord.gg/your-invite-link) to chat with the community.
- Follow us on [Twitter](https://twitter.com/your-twitter) for updates.

## License

By contributing to AstroAlert, you agree that your contributions will be licensed under the [MIT License](LICENSE).
