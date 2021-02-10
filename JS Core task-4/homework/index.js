function getAge(date) {
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    };
    const birthDate = new Date(date).toLocaleString('utc', options);
    const now = new Date().toLocaleString('utc', options);
    const formattedNowDate = now.split('.').reverse().join('-');
    const formattedBirthDate = birthDate.split('.').reverse().join('-');
    const thousand = 1000;
    const sixty = 60;
    const twFour = 24;
    const treeHundred = 365.25;

    return Math.floor(( new Date(formattedNowDate) - 
                        new Date(formattedBirthDate)) / thousand / (sixty * sixty * twFour) / treeHundred);
}

function getWeekDay(date) {
    const days = ['Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const formattedDate = new Date(date);

    return days[formattedDate.getDay()];
}

function getProgrammersDay(year) {
    const twNine = 29;
    const leap = new Date(year, 1, twNine).getMonth() === 1,
    mouth = 8,
    day12 = 12, 
    day13 = 13;

    if(leap) {

        return `12 Sep, ${year} (${getWeekDay(new Date(year, mouth, day12))})`;
    }else{

        return `13 Sep, ${year} (${getWeekDay(new Date(year, mouth, day13))})`;
    }
}

 function howFarIs(day) {
    const aDay = day[0].toUpperCase() + day.slice(1);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const now = new Date();
    const today = days[now.getDay()];
    const todayIdx = days.indexOf(today);
    const aDayIdx = days.indexOf(aDay);

    if(todayIdx > aDayIdx) {
       
        return `It's ${aDayIdx + (days.length - todayIdx)} day(s) left till ${aDay}.` ;
    }else if (todayIdx < aDayIdx) {
        
        return `It's ${aDayIdx - todayIdx} day(s) left till ${aDay}.`; 
    }else if(todayIdx === aDayIdx) {
        
        return `Hey, today is ${aDay} =)`;
    }

 }

function isValidIdentifier(inpText) {
    const myRegExp = /^[a-zA-Z_$][\w$]*$/;
    
    return myRegExp.test(inpText);
}

function capitalize(str) {
    const regExp = /^(.)|\s+(.)/g;
    
    return str.replace(regExp, symbol => symbol.toUpperCase());
}

function isValidAudioFile(audioFile) {
    const myRegExp = /^[a-zA-Z]+\.(?:mp3|flac|alac|aac)$/;
    
    return myRegExp.test(audioFile);
}

function getHexadecimalColors(str) {
    const pattern = /#([a-f0-9]{3}){1,2}\b/gi;

    return str.match(pattern) || [];
}

function isValidPassword(password) {
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

        return passwordPattern.test(password);
}

function addThousandsSeparators(number) {
    const stringNumber = number.toString();
    const myRegExp = /\B(?=(\d{3})+(?!\d))/g;

    return stringNumber.replace(myRegExp, ',');
}

