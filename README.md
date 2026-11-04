A beginner-friendly campus lost-and-found website built with **HTML, CSS and vanilla JavaScript**. 

## Features

- Responsive layout for desktop and mobile
- Report a lost item or a found item
- Browse recent reports
- Search by item name, location, category or description
- Filter by lost/found status and category
- Email link to contact the person who posted an item
- Saves new posts in the browser with `localStorage`
- Includes sample posts so the homepage is not empty

## Run locally

1. Download or clone this repository.
2. Open `index.html` in a modern web browser.
3. To edit the project, open the folder in VS Code or another code editor.

No framework, package installation or server is required for this demo.

The work is divided into three independent responsibilities. 


Gunjan — Frontend structure | HTML and page content | `index.html`: header/navigation, hero section, statistics, browse area, report dialog, footer and accessible form labels |
ROUNAK kumar prasad — UI and styling | CSS and responsive design | `style.css`: colour theme, typography, cards, buttons, modal styling, mobile/tablet layouts and hover states |
Akash yadav — Functionality | JavaScript and testing | `script.js`: sample data, report submission, localStorage, search, filters, count updates, validation and browser testing |

project limitations

This is a **front-end academic prototype**, not a production portal:
- Data is stored only in the browser that created the post. It is not shared between students or devices.
- Contact emails are visible in the page's mail link. 
- There is no login, database, admin moderation or verified ownership process.
