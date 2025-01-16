# Vatsal Sanjay's personal Website

The official website for the Computational Multiphase Physics Laboratory, built with Jekyll.

## Directory Structure

```
.
├── _config.yml              # Site configuration
├── _layouts                # Page templates
│   ├── default.html       # Base layout
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
- [Font Awesome (MIT)](https://fontawesome.com/)
- Fontello (Various licenses)
- Libre Baskerville (SIL Open Font License)
- Open Sans (Apache License 2.0)