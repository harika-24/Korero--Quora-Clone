## **TEAM ESPRESSO**
#### **Project Title - KORERO** 
<br/>

### **Description** 
The purpose of our app is for users to post their queries and answer the already exisiting questions. Each of these questions are assigned to a particular category. The users can upvote/downvote an answer or question. They can follow the exisiting people and see more of their answers. The user also has the option to edit or delete his answers on a post or his post completely.

<br/>

### **Requirements** 
<br/>

####
1. **User interface with data by at least 2 CRUD operations (create, read, update, delete) for at least one database table.**

    The project has made use of POST, GET, PUT and DELETE REST APIs which perform the corresponding CRUD operations. The REST APIs have been implemented for each of the collections, namely Users, Questions, Answers, Posts and Spaces. These APIs are used to make changes in the databases. Implementation was done with the help of Insomnia and then once they were working, integrated it 
    with the frontend.

<br/>

#### 
2. **At least 3 different UI routes (appearing to the user as different pages).**
    <br/>
    
    The routes created for the api was - /api/v1/home. This page shows the entire feed which comprises of the questions you have asked, questions people you follow have asked and gives you the option to answer to them. There is also an option to follow spaces which comprise of information pertaining to their fields.
<br/>

    /following - when appended to the original route goes to the following page. This page allows user to follow the people they wish to follow, similar to follow option on any social media app.

    /answer - when appended to the original route goes to the answer page. This page allows user to see all the questions that he has asked and his followers have asked.

    /spaces - when appended to the original route it redirects to the spaces page. The spaces are pages which have information that the page is about. So when the user follows the spaces they will be shown all the posts that have been made in that space.




<br/>

3. #### **At least one Bootstrap UI component not featured in the demo application.**

    The project makes use of the bootstap carousel. In the the Landing page, just below the discover spaces, there is about us link. This goes to the About the Team page. The carousel displays the team members and their education.

<br/>




4. #### **Different layout and design from the demo application; it should not look like an obvious clone.**

    The project looks very different compared to the demo application. The splash screen of the application shows the logo with the google sign option, and then the landing page is divided into three column layout. First colum has the list of spaces that the user is following. The middle column which cover the larger area of the screen is the one which contains the posts and questions. The third column display facts about the spaces and gives the option for the user to follow them. 
    
    <br/>



<br/>

5. #### **3rd party library for React**
    The project makes use React-Responsive-modal, React-quill and Bootstrap forms and dropdowns for the Add question, add answer modal boxes. 
