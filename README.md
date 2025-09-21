Deployed web service on Render: https://a3-amandachavarriapleitez.onrender.com

Technical Achievements

1. Single-Page App with Real-Time Updates – 
I implemented a single-page application where users can add a mood entry and immediately see the updated table without reloading the page. When a user submits an entry, the data is sent to the server, which calculates derived fields like score and status, and then returns the full list of entries. The client updates the DOM dynamically using JavaScript, including a dataCache array to track current entries for editing purposes. This was challenging because it required managing asynchronous requests, ensuring the UI remained consistent, and properly handling the addition of the new notes field. I also had to handle edge cases such as editing an entry while other entries exist in the table.

2. Full CRUD Implementation (Create, Read, Update, Delete) – 
Beyond adding entries, I implemented full CRUD functionality: users can edit or delete any entry. I tracked each entry’s _id from MongoDB so that edits update the correct document on the server. The delete functionality removes the entry from both the database and the displayed table instantly. This achievement was challenging because it required careful management of DOM elements, event listeners for dynamic buttons, and ensuring that the client and server states were always in sync.

3. Deployment and Environment Configuration –
I deployed the site to Render, which involved configuring environment variables to securely store MongoDB credentials. Initially, I encountered errors due to the .env file being ignored by Git for security. I learned to configure Render’s environment variables and update the start command in package.json to properly load them. This allowed the application to run securely in production without exposing sensitive information in the repository.

Design / UX Achievements

1. Accessibility Enhancements – 
I implemented twelve accessibility improvements based on W3C guidelines. Examples include semantic HTML for headings and form elements, labels for all inputs, proper color contrast between text and backgrounds, and etc. This was challenging because some default Bootstrap styles did not meet accessibility standards, requiring overrides and testing. The improvements make the site usable for users with visual impairments and improve overall usability.

2. CRAP Principles – 

Contrast: I used strong color differences between table headers and content, as well as bright buttons against the white background, to draw attention to key elements like actions and data entry points.

Repetition: Consistent use of Bootstrap cards, buttons, and font styles across the site reinforces a unified look and feel, making it easier for users to recognize functional elements.

Alignment: All form fields, labels, and table columns are left-aligned, creating a clean and organized layout that guides the user’s eye naturally through the interface.

Proximity: Related items, such as mood, energy, and notes inputs, are grouped together within the form, and action buttons (edit/delete) are clustered in the table, making the interface intuitive to navigate.

3. User Testing / Feedback –
I conducted a short user test where participants(2 of my friends) were asked to add, edit, and delete a mood entry without guidance. They generally understood the form quickly, but some initially missed the “edit” button due to its size and placement. One participant suggested that the notes field could be more prominent. Based on this feedback, I would consider enlarging the edit buttons and providing subtle visual cues for optional notes to further improve clarity and usability.