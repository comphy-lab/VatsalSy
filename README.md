# Vatsal Sanjay's personal Website

[![Website Status](https://img.shields.io/website?url=https%3A%2F%2Fvatsalsanjay.com&style=flat-square&logo=github&label=Website)](https://vatsalsanjay.com)
[![Pages Build](https://img.shields.io/github/actions/workflow/status/VatsalSy/VatsalSy.github.io/pages/pages-build-deployment?style=flat-square&logo=github&label=Pages)](https://github.com/VatsalSy/VatsalSy.github.io/actions/workflows/pages/pages-build-deployment)
[![Issues](https://img.shields.io/github/issues/VatsalSy/VatsalSy.github.io?style=flat-square&logo=github)](https://github.com/VatsalSy/VatsalSy.github.io/issues)
[![PRs](https://img.shields.io/github/issues-pr/VatsalSy/VatsalSy.github.io?style=flat-square&logo=github)](https://github.com/VatsalSy/VatsalSy.github.io/pulls)
[![License](https://img.shields.io/github/license/VatsalSy/VatsalSy.github.io?style=flat-square)](LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/VatsalSy/VatsalSy.github.io?style=flat-square&logo=github)](https://github.com/VatsalSy/VatsalSy.github.io/commits/main)
[![Jekyll](https://img.shields.io/badge/Jekyll-4.3.2-%23CC0000?style=flat-square&logo=jekyll)](https://jekyllrb.com/)

The personal website for Vatsal Sanjay, built with Jekyll. If you are looking for the website of the Computational Multiphase Physics Lab, check out [comphy-lab.org](https://comphy-lab.org) or [github](https://github.com/comphy-lab).

## Directory Structure

```
.
├── _config.yml              # Site configuration
├── _layouts                # Page templates
│   ├── default.html       # Base layout
├── .github                # GitHub templates and configurations
│   ├── ISSUE_TEMPLATE    # Issue templates
│   └── PULL_REQUEST_TEMPLATE.md # PR template
├── assets                 # Static files
│   ├── css               # Stylesheets
│   ├── favicon           # Site favicon
│   ├── images            # Image files
│   ├── js                # JavaScript files
│   └── logos             # Logo files
├── about.md               # About page content
├── index.html             # Homepage
├── Gemfile               # Ruby dependencies
└── _site                 # Generated site (not tracked in git)
```

## Part A: Front-End Documentation

### Local Development

1. **Prerequisites**
   - Ruby (version 2.5.0 or higher)
   - Bundler (`gem install bundler`)

2. **Install Dependencies**
   ```bash
   bundle install
   ```

3. **Run Local Server**
   ```bash
   bundle exec jekyll serve
   ```
   - Visit http://localhost:4000 in the browser
   - Changes in source files trigger automatic rebuilds

4. **Deployment**
   - Typically managed via GitHub Pages when merged/pushed to the main branch
   - Local testing is recommended before committing changes

### Content Management

#### About Page
- `about.md`: Contains the About section in markdown
- Standard markdown elements (headers, lists, links) are supported
- Edits automatically appear once the site is rebuilt


#### Adding or Editing Team 

See: [comphy-lab.org/team](https://comphy-lab.org/team) and to edit, see: [github](https://github.com/comphy-lab/comphy-lab.github.io)

#### Research Papers

See: [comphy-lab.org/research](https://comphy-lab.org/research) and to edit, see: [github](https://github.com/comphy-lab/comphy-lab.github.io)

## Part B: Back-End Documentation

### Configuration and Layouts
- `_config.yml`: Site-wide settings, collections, build options
- Layout Templates in `_layouts/`
- Partial Includes in `_includes/`
- Assets in `assets/`

### Design Elements
- **Color Scheme**
  - Gradient text (Red to Blue) for lab name
  - Warm orange tint + blur for header
- **Typography**
  - Libre Baskerville, Open Sans
  - Gradients for emphasis
- **Favicon**
  - Located in `/assets/favicon/`
  - Multiple sizes for different devices and browsers
  - Generated from CoMPhy Lab logo

### Fonts and Icons Attribution
- [Academicons 1.7.0 (SIL OFL 1.1, MIT)](https://jpswalsh.github.io/academicons/)
- [Font Awesome](https://fontawesome.com/)
- Fontello (Various licenses)
- Libre Baskerville (SIL Open Font License)
- Open Sans (Apache License 2.0)


## Contributing Guidelines

### Issue Templates
The repository includes several issue templates to streamline the process of reporting problems or requesting changes:

1. **[Bug Report](https://github.com/VatsalSy/VatsalSy.github.io/issues/new?template=bug_report.yml)**: Use this template to report website issues, broken links, or display problems
2. **[Add Team Member](https://github.com/VatsalSy/VatsalSy.github.io/issues/new?template=add_team_member.yml)**: Template for requesting addition of new lab members with their details
3. **[Add Publication](https://github.com/VatsalSy/VatsalSy.github.io/issues/new?template=add_publication.yml)**: Template for adding new research publications with metadata

To create a new issue:
1. Click one of the template links above, or
2. Go to the Issues tab in GitHub
3. Click "New Issue"
4. Choose the appropriate template
5. Fill in the required information
6. Submit the issue

### Pull Request Template
When submitting changes, use the provided PR template which includes:
- Description of changes
- Type of change (bug fix, feature, content update, etc.)
- Testing checklist
- Related issues
- Screenshots (if applicable)

To submit a PR:
1. Fork the repository
2. Create a new branch for your changes
3. Make and test your changes locally
4. Create a PR using the template
5. Link any related issues
6. Wait for review
