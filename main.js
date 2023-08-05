var inputName = document.getElementById('InputName'),
    inputurl = document.getElementById('InputUrl'),
    submit =document.getElementById('submit'),
    tbody = document.getElementById('tbody');
//  console.log(inputName)
var allBookmark;

if(localStorage.bookmarks != null){
    allBookmark = JSON.parse(localStorage.bookmarks)
}else{
  allBookmark = [];
}
    submit.addEventListener("click",function() {
     var bookmark ={  
       finput : inputName.value,
       sinput : inputurl.value
     }
     
      allBookmark.push(bookmark)
      localStorage.setItem('bookmarks',JSON.stringify(allBookmark))
      showData()
      clearForm()
      removeClasse()

     
    })
 function clearForm() {
    inputName.value ='';
    inputurl.value =''; 
 }
 function showData() {
    var trs ='';
    for (let index = 0; index < allBookmark.length; index++) {
        trs += `
         <tr class="">
        <td scope="row">${index + 1}</td>
        <td>${allBookmark[index].finput}</td>
        <td><a href="${allBookmark[index].sinput}" target='_blank' class="btn btn-primary">Visit</a></td>
        <td><butten onclick='deletRow(${index});' class="btn btn-danger">Delete</butten></td>
    </tr>
        `
        
    }

 tbody.innerHTML = trs;
 }
showData();
function deletRow(index) {
allBookmark.splice(index,1);
localStorage.bookmarks = JSON.stringify(allBookmark)
showData()
}

inputName.addEventListener('keyup',function(){
    inputName.classList.add('is-invalid');
    if(inputName.value.length > 2 ){

        inputName.classList.add('is-valid');
        inputName.classList.remove('is-invalid'); 
    }else{
        inputName.classList.remove('is-valid');
        inputName.classList.add('is-invalid');
        
    }
    disabelbtn()
})


inputurl.addEventListener('keyup',function(){

    inputurl.classList.add('is-invalid');
    var pattern = new RegExp(
        '^([a-zA-Z]+:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$', // fragment locator
        'i'
      );
    


    if (pattern.test(inputurl.value)) {
        inputurl.classList.add('is-valid');
        inputurl.classList.remove('is-invalid');

    } else {
        inputurl.classList.remove('is-valid');
        inputurl.classList.add('is-invalid');
        
    }
   
    disabelbtn()


})
function removeClasse() {
    inputurl.classList.remove('is-invalid');
    inputurl.classList.remove('is-valid');
    inputName.classList.remove('is-valid');
    inputName.classList.remove('is-invalid');
        
}
function disabelbtn() {
    if(inputName.classList.contains("is-valid") && inputurl.classList.contains("is-valid")){
        submit.removeAttribute('disabled')

    }else{
        submit.setAttribute('disabled','disabled')  
    }
}
