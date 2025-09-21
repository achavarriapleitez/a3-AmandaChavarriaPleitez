Deployed web service on Render: https://a3-amandachavarriapleitez.onrender.com

Technical Achievements

1. Single-Page App with Real-Time Data Updates (5 points)
- Implemented a single-page application using vanilla JavaScript and Express.js, where users can submit mood entries and immediately see their data reflected in the table without reloading the page.
- The server calculates derived fields such as score and status for each entry. After submission, the client fetches the updated list of entries from the server and dynamically updates the table.
- Challenge: Ensuring the table stays in sync with server-side data required careful management of state in dataCache and proper async handling of fetch requests.

2. Full CRUD Functionality (5 points)
- Added the ability to create, read, update, and delete mood entries.
    - Create: Users can add new mood entries via the form.  
    - Read: Data is fetched from MongoDB and displayed in the table.
    - Update: Clicking an "Edit" button pre-populates the form for an existing entry, which can then be saved to update the server data.
    - Delete: Users can remove entries directly from the table.
- Challenge: Integrating editing functionality required tracking the _id of the entry being edited and differentiating between a new submission and an update. Ensuring updates also refreshed the table correctly was a tricky part of asynchronous client-server interaction.

3. Notes Field Integration
- Extended the data model to include an optional notes field for each mood entry.
- Updated both front-end (form input and table column) and server-side logic to handle the notes field.
- Challenge: Making sure notes persisted correctly and displayed alongside other entry data required carefully updating both the server routes and the DOM manipulation logic.

Design / UX Achievements

1. User Interface Testing with Think-Aloud Protocol (5 points)
- Conducted informal usability testing with two friends.
- Task: "Add a mood entry with a date, mood, energy, and optional notes, then edit the entry and delete one entry from the table."
- Findings:
    - Positive Comments: 
        - Users appreciated the immediate update of the table after submission and commented that the notes field made the interface feel more personalized as there is only so much that can be communicated with multiple choice options and numbers.
    - Potential Improvements: 
        - Consider adding a small tooltip or hover effect on action buttons to make the interface even more intuitive. Also, adding a confirmation prompt for deletion could prevent accidental data loss(had a modal to confirm deletion of entry in A2 but removed it for A3).
        - Consider adding more mood options besides just Happy, Neutral, and Sad. 
        - Consider improving the Status logic for interpreting entries.
        - Consider adding a 'sign out' button on the Mood Tracker index.html.

2. Accessibility & Lighthouse Achievements
- High Lighthouse Scores: Both the login page and the mood tracker homepage scored between 98–100 on Accessibility, SEO, Performance, and Best Practices when tested with Google Lighthouse.
    - Accessibility Improvements: I made sure to use semantic HTML for form elements and headings, proper labeling of inputs, sufficient color contrast, and keyboard navigability. This ensures the app is usable by people with visual or motor impairments.
    - SEO Enhancements: Added descriptive titles, meta tags, and etc so the site is search-friendly and understandable by assistive technologies.
    - Performance Optimizations: Used Bootstrap’s lightweight grid system and optimized client-side JavaScript to keep load times fast even with dynamic updates.
    - Best Practices: Followed modern web standards (secure connections, responsive design, minimized unused code), which Lighthouse validated.

3. User-Friendly Feedback
- The app provides immediate feedback (new entries appear instantly, edits update in place, deletions remove rows right away). This makes the experience feel smooth and interactive, reducing confusion.

4. Personalization with Welcome Message
- After login, users see a personalized greeting (“Welcome, (user)!”). This creates a sense of connection and ownership over their data — a small but meaningful UX touch.