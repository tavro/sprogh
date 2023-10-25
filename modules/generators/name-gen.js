function generateRandomCityNames(numberOfCities) {
    const vowels = 'aeiou';
    const consonants = 'bcdfghjklmnpqrstvwxyz';
    const cities = new Set();

    while (cities.size < numberOfCities) {
        let city = '';
        let length = Math.floor(Math.random() * 3) + 3;
        let isVowelStart = Math.random() >= 0.5;

        for (let i = 0; i < length; i++) {
            if (isVowelStart) {
                city += vowels[Math.floor(Math.random() * vowels.length)];
            } else {
                city += consonants[Math.floor(Math.random() * consonants.length)];
            }
            isVowelStart = !isVowelStart;
        }

        cities.add(city.charAt(0).toUpperCase() + city.slice(1));
    }

    return Array.from(cities);
}

const numberOfCities = 10;
const randomCityNames = generateRandomCityNames(numberOfCities);
console.log(randomCityNames);