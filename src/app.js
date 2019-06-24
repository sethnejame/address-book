const storage = window.localStorage
var idCounter = 0;


document.getElementById("show-form-button").addEventListener("click", function () {
  document.getElementById("show-div").style.display = "block";
});

document.getElementById("hide-form").addEventListener("click", function () {
  document.getElementById("show-div").style.display = "none";
});


console.log("here is some text")

const renderContacts = () => {

  const contacts = JSON.parse(storage.getItem('contacts'))

  let div = document.querySelector('.contact-list')

  if (contacts) {
    div.innerHTML = ''

    const ul = document.createElement('ul')

    contacts.forEach(contact => {
      let li = document.createElement('li')
      li.innerHTML = `
        <div id="contact-card">
          <div class="content">
            <h2><i class="ion-md-person"></i>${ contact.name}</h2>
            <p>${ contact.company}</p>
            <p>${ contact.notes}</p> 
            <p>${ contact.email} | 
            <a href="https://www.twitter.com/${ contact.twitter}">@${contact.twitter}</a></p>
          </div>
          <br>
        </div>
     `

      li.setAttribute("id", contact.id)

      let button = document.createElement('button');

      button.classList = "delete-contact ui mini orange button";

      button.innerHTML = 'Delete';

      let btn = document.createElement("btn");

      btn.classList += "Modify ui mini orange button";

      btn.innerHTML = 'Modify';

      button.addEventListener("click", () => {

        let contactLiID = document.getElementById(contact.id)
        contactLiID.parentNode.removeChild(contactLiID)

        let storedNames = JSON.parse(storage.getItem("contacts"));

        for (let i = 0; i < storedNames.length; i++) {
          console.log(i)
          if (storedNames[i].id === contact.id) {
            console.log(storedNames[i].id)
            console.log(contact.id)
            storedNames.splice(storedNames[i], 1)
            storage.setItem('contacts', JSON.stringify(storedNames));
            // location.reload();
          }
        }
      })

      li.appendChild(button)

      li.appendChild(btn)

      ul.appendChild(li)
    })

    div.appendChild(ul)
  } else {

    div.innerHTML = '<p>You have no contacts in your address book</p>'

  }

}


document.addEventListener('DOMContentLoaded', () => {

  renderContacts()

  const addContactForm = document.querySelector('.new-contact-form')

  addContactForm.addEventListener('submit', event => {
    event.preventDefault()

    const {
      name,
      email,
      phone,
      company,
      notes,
      twitter,
    } = addContactForm.elements


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

    storage.setItem('contacts', JSON.stringify(contacts))

    renderContacts()
    addContactForm.reset()

  })
})

