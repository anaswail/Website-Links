let webTitle = document.getElementById('webTitle');
let webLink = document.getElementById('webLink');
let submit = document.getElementById('submit');

submit.innerHTML = 'Add WebSite';

// Function to add delete event listeners and update 
function addDeleteEventListeners() {
    // delete 
    document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener("click", (e) => {
            e.target.parentElement.remove();
            localStorage.setItem('output', document.querySelector('.outputContent').innerHTML);
        });
    });

    // update 
    document.querySelectorAll(".update").forEach(button => {
        button.addEventListener("click", (e) => {
            let parent = e.target.parentElement;
            webTitle.value = parent.querySelector('#title').innerText;
            webLink.value = parent.querySelector('.visit a').href;

            // Add an event listener to the submit button to update the values
            submit.addEventListener("click", () => {
                parent.querySelector('#title').innerText = webTitle.value;
                parent.querySelector('.visit a').href = webLink.value;

                // Save updated elements in local storage
                localStorage.setItem('output', document.querySelector('.outputContent').innerHTML);

                // Clear the form values
                webTitle.value = '';
                webLink.value = '';
            }, { once: true });
        });
    });
}

// local storage test
if (localStorage.getItem("output")) {
    document.querySelector('.outputContent').innerHTML += localStorage.getItem("output");
    addDeleteEventListeners();
} else {
    console.log("hello world");
}

// add Event onclick
submit.addEventListener("click", () => {
    if(webTitle.value != '' || webLink.value != "") {
    submit.innerHTML = 'Add WebSite';

        console.log("Button clicked");
        console.log("webTitle value:", webTitle.value);
        console.log("webLink value:", webLink.value);
    
        // add output ul
        let output = document.createElement('ul');
        output.className = 'output output list-none text-white font-bold text-[15px] drop-shadow-md flex translate-x-[5%] md:translate-x-0 md:w-full justify-between bg-[#373737] rounded-[10px] mt-2 w-[90%]';
    
        // add output li
        let li = [];
        for (let i = 0; i < 4; i++) {
            li[i] = document.createElement('li');
    
            // title
            if (i == 0) {
                li[i].innerHTML = webTitle.value;
                li[i].id = "title";
            }
    
            // visit link
            else if (i == 1) {
                let link = document.createElement('a');
                link.innerText = "Visit";
                link.target = "_blank"; // Opens link in a new tab
                li[i].appendChild(link);
                li[i].className = "visit";
                link.href = webLink.value;
    
                console.log("link.href set to:", link.href);
            }
    
            // update btn
            else if (i == 2) {
                li[i].innerText = 'Update';
                li[i].className = 'update';
            }
    
            // delete btn
            else {
                li[i].innerText = 'Delete';
                li[i].className = 'delete';
            }
    
            // add lis to ul
            output.appendChild(li[i]);
        }
    
        // read elements in html
        document.querySelector('.outputContent').appendChild(output);
    
        // delete value from the forms
        webTitle.value = '';
        webLink.value = '';
    
        // save elements in local storage
        localStorage.setItem('output', document.querySelector('.outputContent').innerHTML);
    
        // add event listeners for the delete buttons
        addDeleteEventListeners();
    }
    else{
        submit.innerText = "Please enter the data correctly"
    }
});
