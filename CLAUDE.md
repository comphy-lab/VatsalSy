# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is Vatsal Sanjay's personal website built with Jekyll and hosted on GitHub Pages at https://comphy-lab.org/vatsalsy. The site serves as a redirect hub to the CoMPhy Lab website (https://comphy-lab.org) for research content, team information, and contact details.

## Development Commands

### Local Development
```bash
# Install dependencies (first time setup)
bundle install

# Run local development server
bundle exec jekyll serve
# Site will be available at http://localhost:4000

# Build the site without serving
bundle exec jekyll build
```

### Ruby Version
This project uses Ruby ~> 3.2.0. Ensure you have the correct version installed.

## Architecture

### Key Files and Their Purpose

1. **index.html**: Main homepage that displays intro section and loads about content dynamically
2. **aboutVatsal.md**: Contains the about section content that gets loaded via JavaScript into the homepage
3. **_includes/theme-init.html**: Theme initialization script that handles dark/light mode persistence across page loads
4. **assets/js/main.js**: Core JavaScript handling:
   - Dynamic loading of aboutVatsal.md content using marked.js
   - Mobile menu functionality
   - Smooth scrolling
   - Email copy functionality
   - Back to top button
5. **assets/js/command-palette.js**: Command palette functionality for keyboard navigation and quick actions
6. **assets/js/command-data.js**: Command definitions and data for the command palette system
7. **assets/js/platform-utils.js**: Platform detection utilities for OS-specific keyboard shortcuts and behaviors

### Redirect Pages

The following pages redirect to the CoMPhy Lab website:
- about.md → /#about (homepage section)
- contact.md → https://comphy-lab.org/join
- research-interests.md, research-interest.md → https://comphy-lab.org/research
- phd-thesis.md → https://comphy-lab.org/research#thesis
- talks.md → https://comphy-lab.org/research

### Jekyll Configuration

- **_config.yml**: Site configuration including title, URL, plugins, and collections
- **_layouts/default.html**: Base template for all pages
- **Gemfile**: Ruby dependencies including Jekyll 4.3.2 and various plugins

### Content Management

- Team information and research papers are managed at the CoMPhy Lab organization repository
- This site primarily serves as a personal landing page with redirects
- About content is loaded dynamically from aboutVatsal.md

**IMPORTANT**: When updating `aboutVatsal.md`, also update the fallback content in `about.md` (lines 15-37) to keep them synchronized. The fallback is used when JavaScript is disabled.

### Assets Structure

- CSS files including academicons, fontello icons, and custom styles
- Favicon files in multiple formats
- Logo files for CoMPhy Lab and personal branding
- Team member images (though team management happens at CoMPhy Lab site)

## Important Notes

- This is a redirect-focused site - most content lives at https://comphy-lab.org
- Changes to team or research content should be made in the CoMPhy Lab organization repository
- The site uses GitHub Pages for automatic deployment on push to main branch
- Local testing is recommended before committing changes