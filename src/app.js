const storage = window.localStorage

// Toggle form field displayed/hidden
document.getElementById("show-form-button").addEventListener("click", function () {
  document.getElementById("show-div").style.display = "block";
});
// Hide showForm div after submit
document.getElementById("hide-form").addEventListener("click", function () {
  document.getElementById("show-div").style.display = "none";
});



console.log("here is some text")

const renderContacts = () => {
  
  // Read all the contacts from the storage
  const contacts = JSON.parse(storage.getItem('contacts'))

  // Select the container we will use to list the contacts 
  let div = document.querySelector('.contact-list')

  if (contacts) {
    div.innerHTML = ''

    // render the contacts
    const ul = document.createElement('ul')

    // For every contact in our array of contacts, we will
    // create a li element that will contain a card with
    // all the information of the contact
    contacts.forEach(contact => {
      let li = document.createElement('li')
      li.innerHTML = `
        <div class="card ui raised very padded text container segment">
          <div class="icon">
          <i class="address card outline icon" style="width:50px; height:50px"></i>
          </div>
          <div class="content">
            <h1>${ contact.name }</h1>
            <h2>${ contact.company }</h2>
            <p>${ contact.notes }</p> 
            ${ contact.email } | 
            <a href="https://www.twitter.com/${ contact.twitter}">@${contact.twitter}</a>
          </div>
          <br>
        </div>
     `
      // Create new delete button
      let button = document.createElement('button');
      // Give it a class of "delete-contact" !!TODO - Change delete-contact to unique value for every card
      button.classList += "delete-contact";
      // Inside of the button will read "Delete Contact"
      button.innerHTML ='Delete Contact';
      // delete button functionality
      // document.getElementsByClassName("delete-contact").addEventListener("click", function () {
      //   console.log("delete was successful")
      // });
      // Append (add) the button to the bottom of the new contact card
      li.appendChild(button) 

      // Add the contact's li to the unordered list we created earlier
      ul.appendChild(li)
    })

    // Lastly, append the list to the contact-list container.
    div.appendChild(ul) 
  } else { 
    div.innerHTML = '<p>You have no contacts in your address book</p>' 
  }

}


document.addEventListener('DOMContentLoaded', () => {
    // As soon as the page is loaded, run render Contacts to load the page up with saved contacts 
    renderContacts()
    // Select form object from the DOM
    const addContactForm = document.querySelector('.new-contact-form')
  
    // Register an event to listen for form submission
    addContactForm.addEventListener('submit', event => {
      event.preventDefault()
      //const storage = window.localStorage
      const {
        name,
        email,
        phone,
        company,
        notes,
        twitter,
      } = addContactForm.elements
  
      // Create contact object
      const contact = {
        id: Date.now(),
        name: name.value,
        email: email.value,
        phone: phone.value,
        company: company.value,
        notes: notes.value,
        twitter: twitter.value,
      }      
  
      console.log(`Saving the following contact: ${JSON.stringify(contact)}`)

      let contacts = JSON.parse(storage.getItem('contacts')) || []

      contacts.push(contact)
      // store existing contact currently added
      storage.setItem('contacts', JSON.stringify(contacts))

      renderContacts()
      addContactForm.reset()

    })
  })  

