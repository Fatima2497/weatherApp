const submitBtn = document.getElementById('submit');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');
// const day = document.getElementById("day")
const date = document.getElementById("date")
// console.log(temp);

const currentDate = new Date()
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let day = days[ currentDate.getDay()]
const dat = currentDate.getDate();
const month = months[currentDate.getMonth()];
const year = currentDate.getFullYear();

document.getElementById("day").innerHTML = `${day}`
document.getElementById("date").innerHTML = `${dat} ${month} ${year} `


const getInfo = async (event) => {
    event.preventDefault();

    let cityVal = cityName.value
    if (cityVal === "") {
        city_name.innerText = "Please write name before search";
        datahide.classList.add('data_hide');
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=dfc8ff2e0694b08aad1f9695600bb01f&units=metric`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.textContent = arrData[0].main.temp;
            
            let tempStatus = arrData[0].weather[0].main;


            if (tempStatus === "Clear") {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68; '></i>";
            } else if (tempStatus === "Clouds") {
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
            } else if (tempStatus === "Rainy") {
                temp_status.innerHTML = "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
            } else {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68; '></i>";
            }

            datahide.classList.remove('data_hide');

        }catch{
            city_name.innerText = "Please enter the city name";
            datahide.classList.add('data_hide');
        }
        
    }
}
submitBtn.addEventListener('click', getInfo)