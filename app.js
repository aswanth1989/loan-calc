const submit = document.querySelector('#loan-form');

loadEventListener();

function loadEventListener(){
    submit.addEventListener('submit',calculateResults);
}

function calculateResults(e){
    
    const uiAmount = document.querySelector('#amount');
    const uiInterest = document.querySelector('#interest');
    const uiYears = document.querySelector('#years');

    const uiMonthlyPayment = document.querySelector('#monthly-payment');
    const uiTotalPayment = document.querySelector('#total-payment');
    const uiTotalInterest = document.querySelector('#total-interest');

    const principal = parseFloat(uiAmount.value);
    const calculatedInterests = parseFloat(uiInterest.value)/100/12;
    const calculatedPayment = parseFloat(uiYears.value)*12;


    const x = Math.pow(1+calculatedInterests,calculatedPayment);
    const monthly = (principal*x*calculatedInterests)/(x-1);

    if(isFinite(monthly)){
        uiMonthlyPayment.value = monthly.toFixed(2);
        uiTotalPayment.value = (monthly*calculatedPayment).toFixed(2);
        uiTotalInterest.value = ((monthly*calculatedPayment)-principal).toFixed(2);
    }else{
        showError('Please check your numbers');
    }

    e.preventDefault();
}

function showError(error){
    const errorDiv = document.createElement('div');

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    errorDiv.className='alert alert-danger';

    errorDiv.appendChild(document.createTextNode(error));

    card.insertBefore(errorDiv,heading);

    setTimeout(clearError,3000);
}


function clearError(){
    document.querySelector('.alert').remove();
}