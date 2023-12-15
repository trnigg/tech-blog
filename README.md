# Joe Blogg's Tech Blog!

[`/tech-blog`](https://github.com/trnigg/tech-blog) - Module 14 Challenge

_A simple, yet functional (full-stack) CMS-style blog site._

## Description

- This simple blog-site allows users to view posts and comments - and once logged in, to make, edit and delete their own posts, or to leave comments on posts themselves.
- The site is compatible across devices thanks to fluid, responsive design, and also reacts to users' system-preference for light/dark mode.
- It is written in JS using the [`Node.js`](https://nodejs.org/en) runtime environment, leveraging [`MySQL2`](https://www.npmjs.com/package/mysql2/) for connecting and communicating with the `MySQL` database (db),[`Express`](https://www.npmjs.com/package/express/) for the web framework/server-functionality, [`Handlebars`](https://www.npmjs.com/package/handlebars/) for templated views and [`Open Props`](https://open-props.style/) as the CSS framework.
- The site is deployed via [`Heroku`](https://www.heroku.com/) and uses [`JawsDB`](https://www.jawsdb.com/) for the DB service.
- For a full list of dependencies, please see [`package.json`](./package.json) in the repo.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Roadmap / Known Bugs](#roadmap--known-bugs)
- [License](#license)
- [Questions](#questions)

## Installation

- No installation is necessary, simply visit [**Joe Blogg's Tech Blog**](https://joe-bloggs-tech-blog-35241527d339.herokuapp.com/).

## Usage

1. Opening the web-page using the link above will land the user at the home page.
2. Clicking on any article will expand it, and reveal any comments on that article.
3. In order to leave a comment, the user will need to log in - if they don't have an account yet, they can sign up and then log in with their new credentials.
4. Logging in will also reveal the **Dashboard** option in the navigation menu at the top, which directs the user to a page showing the titles of any posts they have made, along with the option to create a new post.
5. Clicking on the title of a post will present three options to the user; _view_, _edit_ or _delete_ the specific post.  
   _View_ redirects the user to the view seen in **Step 2** above;  
   _Edit_ reveals the contents of the post and allows changes to be made to it (and the title);  
   _Delete_ is even more self-explanatory than the last two. But be careful - deleted posts cannot be recovered.
6. If a user is inactive for more than 10 minutes, they will no longer be able to create, edit or delete any content on the site and will need to log in again.
7. Once done, the user can log out using the dedicated link at the top.

## Roadmap / Known Bugs

The following is a non-exhaustive list of items I would like to address with more development time in the future:

### Features

- Provide a feature for users to view all their comments in one place, and implement ability to delete or edit them.
- Improve site feedback mechanisms by addressing issues such as vague error messages during user login failures and changing from browser alerts to custom modals.

### UI

- Rework UI components currently deemed as merely "acceptable" - for instance, implement dynamic resizing for text-inputs using JavaScript based on their current content.
- Shift focus from a predominantly layout-oriented approach (95%+ of UI development time and CSS) to individualising the sites appearance. Currently, it is essential `Open Props`'s normalised style.

### Code

- Address code maintainability concerns stemming from the tendency to "bolt-on" features to existing ones within the build process, which increased as dev-time decreased. Often this also included "hacky" and makeshift solutions which blurred separation of concerns.
- Streamline and refactor codebase to facilitate easier and safer integration of new features in the future.

## License / Credits

- This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit).

  - Please refer to the [license](./LICENSE) section in the repo for further information.

- Please see the [Description](#description) section for an overview of 3rd-party packages/modules used in this app.

## Questions

- For any questions, issues or feedback, please reach out to me on GitHub at [trnigg](https://github.com/trnigg/).
