function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }


const credit =()=>{
    const type1 = document.querySelector('.type1');
    const type = document.querySelector('.type2');
    const view1 = document.querySelector('.viewDebit')
    const view2 = document.querySelector('.viewCredit')

    if(type.className == 'type2' && view2.className=='viewCredit'){
        view1.className= 'viewDebit2';
        view2.className= 'viewCredit2';
        type.setAttribute('id','credit2')
        type1.setAttribute('id','debit')
    }
}

const debit =()=>{
    const type1 = document.querySelector('.type1');
    const view1 = document.querySelector('.viewDebit2')
    const view2 = document.querySelector('.viewCredit2')
    const type = document.querySelector('.type2');

    if(type1.className == 'type1' && view1.className=='viewDebit2'){
        view1.className= 'viewDebit';
        view2.className= 'viewCredit';
        type1.setAttribute('id','debit2')
        type.setAttribute('id','credit')
    }
}