document.addEventListener("DOMContentLoaded", () => {
    // const ImageEditor = require('tui-image-editor')
    // const FileSaver = require('file-saver'); //to download edited image to local. Use after npm install file-saver
    // const blackTheme = require('./js/theme/black-theme.js')
    // const background = ce('div')
    // background.className = "bg"
    // document.body.prepend(background)
    // function getQuill() {
    //     let quillDiv = ce('div')
    //     quillDiv.id = "editor-container"
    //     // document.body.append(quillDiv)
    // let quill = new Quill('#editor-container', {
    //     modules: {
    //       toolbar: [
    //         ['bold', 'italic'],
    //         ['link', 'blockquote', 'code-block', 'image'],
    //         [{ list: 'ordered' }, { list: 'bullet' }]
    //       ]
    //     },
    //     placeholder: 'Compose an epic...',
    //     theme: 'snow'
    //   })
    //   return quill
    // }
    const header = ce('h1')
    header.innerText = "The Artist's Touch"
    header.className = 'header'
    document.body.append(header)

    

    function qs(selector) {
        return document.querySelector(selector) 
    }

    function ce(element) {
        return document.createElement(element)
    }

    const url = `http://localhost:3000/api/v1`
    const showPanel = qs('div#show-panel')
    // const quillDiv2 = ce('div')
    //     quillDiv2.id = 'editor2'
    //     listItm.append(quillDiv2)
    //     const editor2 = document.getElementById('editor2')
    //      toolbarOptions = [
    //         ['bold', 'italic', 'underline', 'strike'],
    //         ['link', 'blockquote', 'code-block', 'image'],
    //         [{ list: 'ordered' }, { list: 'bullet' }]
    //       ]
          
    //     let quill = new Quill(editor2, {
    //         modules: {
    //           toolbar: toolbarOptions
    //         },
    //         placeholder: 'Compose an epic...',
    //         theme: 'snow'
    //     })


//     async function go() {
//         // let user = await fetchUser() 
//         return clickMe(fetchUser().username)
//     }
// console.log(fetchUser())
    // go()
    fetchUser()
    // You may want to get and store user instance as well for sending post requests
 

    // Think it through a second, everything will be done from the main page and form, that is, viewing and editing
    // This is minimum-viable-product
    // The main thing I want to install is to have event listeners on all of the different buttons surrounding the page,
    // As well as a central show panel that gets appended to only if the button has been clicked on, and if a different button
    // is clicked on, I want to replace (I think overwriting may be ok) every in the show panel with whatever was clicked on, so 
    // I want to effectively use the same commands, show-panel div, and form for seperate functions that each call essentailly the same
    // thing, but with slightly modified urls (and their's installment of the username process that needs to also be completed).

    // The first function you call will want to be something for the signing up or signing in

    // Consider turning this into fetch itfunction, where you sub in the word fetch, and something arguments for each function
    function fetchType(type, username) {
        fetch(url+`/${username}/${type}`)
        .then(res => res.json())
        .then(meanderings => {
            // debugger
            
            if (meanderings[0].created_at == "never created") {
                fillOutForm(username, type, meanderings[0].type_id, meanderings[0].user_id)
            } else {
                showType(meanderings, type, username)
                fillOutForm(username, type, meanderings[0].type_id, meanderings[0].user_id)
            }
           
            
            // let typeUser = [meandering[0].type_id, meandering[0].user_id]
            // if (meanderings.length > 0) {
          
            // }
        })
    }

    function showType(meanderings, typeName, username) {
        
        // maybe put itemBox here\
        // if (itemBox) {
        //     itemBox.remove()
        // }
        // debugger
        let itemBox = ce('div')
        itemBox.className = 'show'
        itemBox.id = `${typeName}2`
        let list = ce('ul')
        list.id = `${typeName}-ul`
        meanderings.forEach(meandering => {
            // let itemBox = ce('div')
            // here too
            
            // return function listAddType(meandering) {
            //     listAddType(meandering)
            //     let listItm = ce('li')
            //     addType(meandering, typeName, listItm, username)
            //     list.append(listItm)
            //     }
            let liTag = listAddType(meandering, typeName, username)
            list.append(liTag)

                
        })
        // list.append(liTag)
        itemBox.append(list)
        showPanel.append(itemBox)
    }

    function listAddType(meandering, typeName, username) {
        let listItm = ce('li')
        let liTag = addType(meandering, typeName, listItm, username)
        return liTag
        }
    // function listAddType(list) {
    //     let listItm = ce('li')
        

   function addType(type, typeName, listItm, username) {

            // debugger
        

        let content = ce('p')
        content.innerHTML = type.content

        let editBtn = ce('button')
        editBtn.className = "btn btn-secondary"
        editBtn.innerText = "Edit"

        let deleteBtn = ce('button')
        deleteBtn.className = "btn btn-outline-dark"

        deleteBtn.innerText = "Delete"

        // let clicked = false
        editBtn.addEventListener('click', () => {
            editBtn.style.display = "none"
            // if (quillDiv2 && quill) {
            //     quillDiv2.remove()
            //     quill.getModule('toolbar').container.remove()
            // }
        //    debugger
        let updateForm = ce('form')

        // let formInput = ce('input')
        // formInput.type = 'text'
        // formInput.value = content.innerText 
        let rand = Math.random()
        let quillDiv2 = ce('div')
        quillDiv2.id = `editor${rand}`
        // Here we may simply look for an existing container, or the editor two, and it must
        // be that on the first second time around with one below, the first container it finds is the
        // one above, also an offshoot of making multiple elements with the same id you are calling on at 
        // the same time, it seems to want to look for the original. 
        listItm.append(quillDiv2)
        
        let editor2 = document.getElementById(`editor${rand}`)
        const toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'],
            ['link', 'blockquote', 'code-block', 'image'],
            [{ list: 'ordered' }, { list: 'bullet' }]
          ]
          
        let quill = new Quill(editor2, {
            modules: {
              toolbar: toolbarOptions
            },
            placeholder: 'Compose an epic...',
            theme: 'snow'
        })
        let value = content.innerHTML
        let delta = quill.clipboard.convert(value)
        quill.setContents(delta, 'silent')
        
        let submitBtn = ce('input')
        submitBtn.type = 'submit'
        submitBtn.value = 'Update Content!'

        updateForm.addEventListener('submit', ()=> {
            event.preventDefault()
            
            // debugger 

            let newContent = quill.root.innerHTML  

            // debugger

            let configObj = {
                method: "PATCH",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    "content": newContent 
                })
            }

        fetch(url+`/${username}/${typeName}/${type.id}`, configObj)
        .then(res => res.json())
        .then(updatedType => {
            // debugger
            updateForm.remove()
            quillDiv2.remove()
            quill.getModule('toolbar').container.remove()
            editBtn.style.display = 'block'
            content.innerHTML = updatedType.content

        })
        })
        updateForm.append(submitBtn)
        quillDiv2.append(updateForm)
    
        })

        deleteBtn.addEventListener('click', () => {
            // debugger
            fetch(url+`/${username}/${typeName}/${type.id}`, {method: "DELETE"})
            listItm.remove()
        })

        
    

        listItm.append(content, editBtn, deleteBtn)
        // list.append(listItm)
        return listItm 
        // list.append(listItm)
        // itemBox.append(list)
    }
// }

    function fetchUser() {
        // make sign in
        let signDiv = ce('div')
                  
        let h2 = ce('h2')
        h2.innerText = "Welcome to The Artist's Touch"
          
        let h3 = ce('h3')
        h3.innerText = "Are you a new user or an existing User?"
          
        let newBtn = ce('button')
        newBtn.className = "btn btn-primary"
        newBtn.innerText = 'New User!'
          
        let existBtn = ce('button')
        existBtn.className = "btn btn-primary"
        existBtn.innerText = 'Existing User!'
          
        let form = ce('form')
          
        let inputName = ce('input')
        inputName.type = 'text'
        inputName.name = 'name'
        let usernameLabel = ce('h4')
        usernameLabel.innerText = 'Username'
        
          
        let submitForm = ce('input')
        submitForm.className = "btn btn-success"
        submitForm.type = 'submit'
        submitForm.value = 'Make new user!'

        let retry = ce('button')
        retry.className = "btn btn-info"
        retry.innerText = "Try Again"

        let br3 = ce('br')
        let br4 = ce('br')


          
          
          
            existBtn.addEventListener('click', () => {
                existBtn.style.display = "none"
                newBtn.style.display = "none"
                
                    submitForm.value = "Let's go!"
          
                form.addEventListener('submit', () => {
                    event.preventDefault()
                    // debugger

                    let username = event.target[0].value 
                    // debugger
                    if (username === "") {
                        username = 'dummy123'
                        // alert("Make sure to fill in the username box!")
                    console.log(signDiv)
                    }
                    
                    fetch(url+`/users/${username}`)
                    .then(res => res.json())
                    .then(user => {
                        if (user == null) {
                            alert("Could not find any matching usernames!")
                            signDiv.remove()
                            fetchUser()
                        } else if (user.username == 'dummy123') {
                            alert('Make sure to fill in the username box!')
                            signDiv.remove()
                            fetchUser()
                        } else {   
                        let userName = user.username
                        // showPanel.removeChild(signDiv)
                        // debugger
                        console.log(signDiv)
                        signDiv.remove()
                        // showPanel.childElements.forEach(el => el.remove())
                        // showPanel.remove(signDiv)
                        clickMe(userName) 
                        }
                    })
                  
                })
                    
                form.append(usernameLabel, inputName, br4, submitForm)
                    
                signDiv.append(retry, br3, form)
                  
            })
           let h4 = ce('h4')
        //    let clicked = false

            newBtn.addEventListener('click', () => {
               newBtn.style.display = "none"
               existBtn.style.display = "none"
            //   if (clicked == true) {
                h4.innerText = "New User? Sign up here!"
                

                let br = ce('br')
                let br2 = ce('br')

                form.append(br, h4)
                  
                let nameLabel = ce('h4')
                nameLabel.innerText = 'Name'
                let signUpInput = ce('input')
                  signUpInput.type = 'text'
                  signUpInput.name = "signup"
                  signUpInput.value = ""
                  nameLabel.append(signUpInput)
                  
                form.addEventListener('submit', () => {
                      event.preventDefault()
                    // debugger
                      let newUsername = event.target[1].value
                      let newName = event.target[0].value 

                    //   if (newUsername == "") {
                    //       newUsername = "dummy123"
                    //   }
                      
                      let configObj = {
                          method: 'POST',
                          headers: {
                              'Content-type':'application/json'
                          },
                          body: JSON.stringify({
                              "name": newName,
                              "username": newUsername
                          })
          
                      }
                    //   debugger
          
                      fetch(url+`/users`, configObj)
                      .then(res => res.json())
                      .then(newUser => {
                          form.reset()
                        //   debugger
                          if (newUser.created_at == "This username is not unique") {
                              alert("This username is not unique")
                              signDiv.remove()
                            fetchUser()
                          } else {

                            //   showPanel.removeChild(signDiv)
                            signDiv.remove()
                            //  call click me once you have the user here, and remove everything that was appended
                                let username = newUser.username
                              clickMe(username) 
                          }
                      })
                  form.append(h4)
               
                  
                })
                form.append(nameLabel, signUpInput, br, usernameLabel, inputName, br2, submitForm)
                signDiv.append(retry, br3, form)
            //   } else {
            //     form.remove(inputName, signUpInput, submitForm)
            //     signDiv.remove(form)
            //   }
              })

              retry.addEventListener('click', () => {
                signDiv.remove()
                fetchUser()
              })


            
           
                signDiv.append(h2, br3, br3, h3, br3, newBtn, br3, existBtn)
                  showPanel.append(signDiv)
            }


// All the event listeners here

function clickMe(username) {

    settings()
  

    const types = ['scraps', 'undecideds', 'inspirings', 'uninspirings', 'musings', 'techniques', 'landscapes', 'worlds', 'possibilities']
// debugger
    for (let type of types) {
        // debugger
        let itemBox = ce('div')
        itemBox.id = `${type}`

        let header = ce('h6')
        header.innerText = `${type}`
        // switch(type){
        //     case "scraps":
        //         header.innerText = "Scraps"
        //     case "undecideds":
        //         header.innerText = "Not sure"
        //     case "inspirings":
        //         header.innerText = "Inspiring"
        //     case "uninspirings":
        //         header.innerText = "Not that inpspiring"
        //     case "possibilities":
        //         header.innerText = "That which is possible"
        //     case "contstraints":
        //         header.innerText = "Some limits, if any ;)"
        //     case "musings":
        //         header.innerText = "Just somethings to ponder..."
        //     case "techniques":
        //         header.innerText = "Techniques"
        //     case "landscapes":
        //         header.innerText = "Landscapes"
        //     case "worlds":
        //         header.innerText = "Worlds"
        //     default:
        //         header.innerText = "The Artist's Touch"
        // }

        itemBox.addEventListener('click', () => {
            // debugger
            let existingItemBox = qs('div.show')
            if (existingItemBox != null) {
                existingItemBox.remove()
            }
            let existingQuillDiv = qs('div#editor')
            if (existingQuillDiv != null) {
                existingQuillDiv.remove()
            }
            let quillToolbar = qs('div.ql-toolbar.ql-snow')
            if (quillToolbar != null) {
                quillToolbar.remove()
            }
            

            let h2 = ce('h2')
            h2.innerText = "Click one of the boxes around the outside to start!"

          
            fetchType(type, username)
            // fillOutForm(username, type, typeUser[0], typeUser[1])
        })

        itemBox.append(header)
        document.body.append(itemBox)
    }
}

// You can have a config object function that just takes in an argument an subs it in for what you're trying to create

// 
function configObjectPost(thatType, newContent, type_id, user_id) {
    return {
        method: 'POST',
        headers: {
            "Content-type":"application/json"
        },
        body: JSON.stringify({
            "content": newContent,
            "type_id": type_id,  
            "user_id": user_id
            // need to call whatever you pass in newContent
        })
    }
}

// might as well make a function for all new contents and post requests
    function fillOutForm(username, type, type_id, user_id) {
        // let form = qs('form.add-content')
        // form.remove()
        let formContainer = qs('div.form')
        // debugger 
        let quillDiv = ce('div')
        quillDiv.className = "quill-editor"
        quillDiv.id = "editor"
        // debugger 
        formContainer.append(quillDiv)
        let editor = document.getElementById('editor')
        let quill = new Quill(editor, {
            modules: {
              toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                ['link', 'blockquote', 'code-block', 'image'],
                [{ list: 'ordered' }, { list: 'bullet' }]
              ]
            },
            placeholder: 'Compose an epic...',
            theme: 'snow'
        })

        let form = ce('form')
     
        let inputContent = ce('input')
        inputContent.type = 'text'
        inputContent.id = 'content-box'
        inputContent.name = 'content'
        // inputContent.innerHTML = getQuill()
        // JSON.stringify(quill.getContents());
        

        let submitBtn = ce('input')
        submitBtn.type = 'submit'
        submitBtn.value = `Let's see it!`

        form.addEventListener('submit', () => {
            event.preventDefault() 
            // debugger
            
            let content = quill.root.innerHTML
            // debugger
            fetch(url+`/${username}/${type}`, configObjectPost(type, content, type_id, user_id))
            .then(res => res.json())
            .then(meandering => {
                form.reset() 
                quill.setContents([{ insert: '\n' }]);
                let liTag = listAddType(meandering, type, username)
                let list = qs(`ul#${type}-ul`)
                // debugger 
                if (list == null) {
                    let meanderings = [meandering]
                    // debugger
                    showType(meanderings, type, username)
                } else {
                list.append(liTag)
                }
            })
    })
    // debugger 
    // formContainer.appendChild(quillDiv)
    // form.append(quillDiv, submitBtn)
    form.append(submitBtn)
    quillDiv.append(form)
}

function settings() {

    let existingItemBox = qs('div.show')
        if (existingItemBox != null) {
            existingItemBox.remove()
        }

    let setBox = ce('div')
    setBox.id = 'settings'

    let setter = ce('h6')
    setter.innerText = 'How to'

    let explanationBox = ce('div')
    let explanations = ce('p')
    explanationBox.className = 'show'
    explanationBox.append(explanations)

    explanations.innerText = "An explanation: \n This app is for the dreamers, the seekers, the boneshakers, the pioneers, the mavericks, and anyone who wants to add something to this amazing thing we call the world, feel free to plan building a ship here, too, if the world just is not big enough for you!!!   \n\n First, the Scraps: \n This is where you put everything when it first comes into the app, kind of like a holding box of possible inspiration. \n Next, you have the Uninspirings, the Inspirings, and the Undecideds. These are where you move the scraps once you've decided whether you were inspired (inspirings) by the scrap, uninspired (uninspirings), or you still don't know (undecideds). \n\n Musings are the bridge to the rest of the framework, they are the infusions of your thoughts, your emotions, and your inspirations.  \n\n We'll skip over worlds for a second, and jump to techniques.  The techniques are the way in which you know and discover to leave that artist's touch. This can include everything from painting, sculpting, and drawing, to programming, architecture design, and graphic design.  And oh yeah, don't limit yourself here, really go for it in seeing what you can discover and maybe even invent.  \n\n Next, we come to landscapes.  Now, landscapes are interesting, they are the ways things come together.  Right here is a great opportunity to think out and concretize how things like what make your inspirings so inspring, what makes a great piece of architecture great, and even what makes the artist's touch so special. \n Note, this may be the most important box.  \n Finally, we come to the possibilities, which could also be called constraints.  This box is for what seems possible or not.  You can just go ahead and throw this box away now! \n\n Oh yeah, back to worlds! \n These are all the ways in which you aspire to add that artist's touch. They are your dreams, and quite possibly what make you, you. Protect them at all costs!"

    setBox.addEventListener('click', () => {
        let existingItemBox = qs('div.show')
        if (existingItemBox != null) {
            existingItemBox.remove()
        }
        let existingQuillDiv = qs('div#editor')
        if (existingQuillDiv != null) {
            existingQuillDiv.remove()
        }
        let quillToolbar = qs('div.ql-toolbar.ql-snow')
        if (quillToolbar != null) {
            quillToolbar.remove()
        }
        
        

        showPanel.append(explanationBox)
        
    })
    setBox.append(setter)
    document.body.append(setBox)
    showPanel.append(explanationBox)
}

})
    
// var quill = new Quill("#editor-container", {
//     modules: {
//       toolbar: [
//         ['bold', 'italic'],
//         ['link', 'blockquote', 'code-block', 'image'],
//         [{ list: 'ordered' }, { list: 'bullet' }]
//       ]
//     },
//     placeholder: 'Compose an epic...',
//     theme: 'snow'
// })

// function settings() {

//     let setBox = ce('div')
//     setBox.className = 'show'
//     setBox.id = 'settings'

//     let explanations = ce('p')

//     explanations.innerText = "An explanation: This app is for the dreamers, the seekers, the boneshakers, the pioneers, the mavericks, and anyone who wants to add something to this amazing thing we call the world, feel free to plan building a ship here, too, if the world just is not big enough for you!!!   \n\n First, the Scraps: \n This is where you put everything when it first comes into the app, kind of like a holding box of possible inspiration. \n Next, you have the Uninspirings, the Inspirings, and the Undecideds. These are where you move the scraps once you've decided whether you were inspired (inspirings) by the scrap, uninspired (uninspirings), or you still don't know (undecideds). \n\n Musings are the bridge to the rest of the framework, they are the infusions of your thoughts, your emotions, and your inspirations.  \n\n We'll skip over worlds for a second, and jump to techniques.  The techniques are the way in which you know and discover to leave that artist's touch. This can include everything from painting, sculpting, and drawing, to programming, architecture design, and graphic design.  And oh yeah, don't limit yourself here, really go for it in seeing what you can discover and maybe even invent.  \n\n Next, we come to landscapes.  Now, landscapes are interesting, they are the ways things come together.  Right here is a great opportunity to think out and concretize how things like what make your inspirings so inspring, what makes a great piece of architecture great, and even what makes the artist's touch so special. \n Note, this may be the most important box.  \n Finally, we come to the possibilities, which could also be called constraints.  This box is for what seems possible or not.  You can just go ahead and throw this box away now!"

//     setBox.addEventListener('click', () => {

//         showPanel.append(explanations)
        
//     })

//     document.body.append(setBox)
//     showPanel.append(explanations)
// }

//       handlers: {
            //           'image': function() {
            //               let newEditor = ce('div')
            //               newEditor.id = 'tui-image-editor'
            //               quillDiv.append(newEditor)
            //                 let instance = new ImageEditor(newEditor, {
            //         includeUI: {
            //             loadImage: {
            //                 path: 'img/sampleImage.jpg',
            //                 name: 'SampleImage'
            //             },
            //             locale: locale_ru_RU,
            //             theme: blackTheme, // or whiteTheme
            //             initMenu: 'filter',
            //             menuBarPosition: 'bottom'
            //         },
            //                     cssMaxWidth: 700,
            //                     cssMaxHeight: 500,
            //                     selectionStyle: {
            //                     cornersize: 20,
            //                     rotatingPointOffset: 70
            //                     }
            //                 })
            //             }
            //         }
            //   }