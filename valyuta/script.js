document.addEventListener("DOMContentLoaded", function () {

    const firstInput = document.getElementById("first-input");
    const secondInput = document.getElementById("second-input");
    const currency = document.querySelectorAll(".currency");
    const currency1 = document.querySelectorAll(".currency1");
    const one = document.getElementsByName("one");
    const two = document.getElementsByName("two");


    let first;
    let second;

    function changeOfCurrencies(e) {
        if (e.target.className == "currency" || e.target.className == "currency1") {
            const changes = [...e.target.parentElement.children];
            changes.forEach(item => {
                if (item.classList.contains("change")) {
                    item.classList.remove("change");
                }
            });
            e.target.classList.add("change");
            calculateOnClassChange();
        }
    }

    const isNumeric = (value) => {
        return !isNaN(parseFloat(value)) && isFinite(value);
    };

    const calculateOnClassChange = () => {
        one.forEach(item => {
            if (item.classList.contains("change")) {
                first = item.innerText;
            }
        });

        two.forEach(item => {
            if (item.classList.contains("change")) {
                second = item.innerText;
            }
        });

        const url = "https://v6.exchangerate-api.com/v6";
        const key = 'a0fc13ae6e803978716017ea';
        let input1 = Number(firstInput.value);

        if (!isNumeric(input1)) {
            alert("Please enter a valid numeric value.");
            return;
        }

        fetch(`${url}/${key}/pair/${first}/${second}/${input1}`)
            .then(r => r.json())
            .then((data) => {
                secondInput.value = data.conversion_result.toFixed(2);

                const exchangeRateParagraph = document.querySelector(".exchange-rate");
                exchangeRateParagraph.textContent = `1 ${first} = ${data.conversion_rate} ${second}`;

                const exchangeRateParagraph2 = document.querySelector(".exchange-rate1");
                exchangeRateParagraph2.textContent = `1 ${second} = ${1 / data.conversion_rate} ${first}`;

                console.log(data.conversion_result);
                console.log(data);
            })
            .catch(error => {
                alert("İnternet bağlantınızı yoxlayın");
                console.log("İnternet bağlantınızı yoxlayın");
            });
    };

    const calculateOnClassChangeReverse = () => {
        one.forEach(item => {
            if (item.classList.contains("change")) {
                first = item.innerText;
            }
        });

        two.forEach(item => {
            if (item.classList.contains("change")) {
                second = item.innerText;
            }
        });

        const url = "https://v6.exchangerate-api.com/v6";
        const key = 'a0fc13ae6e803978716017ea';
        let input1 = Number(secondInput.value);

        if (!isNumeric(input1)) {
            alert("Please enter a valid numeric value.");
            return;
        }

        fetch(`${url}/${key}/pair/${second}/${first}/${input1}`)
            .then(r => r.json())
            .then((data) => {
                firstInput.value = data.conversion_result.toFixed(2);

                const exchangeRateParagraph = document.querySelector(".exchange-rate");
                exchangeRateParagraph.textContent = `1 ${first} = ${data.conversion_rate} ${second}`;

                const exchangeRateParagraph2 = document.querySelector(".exchange-rate1");
                exchangeRateParagraph2.textContent = `1 ${second} = ${1 / data.conversion_rate} ${first}`;

                console.log(data.conversion_result);
                console.log(data);
            })
            .catch(error => {
                alert("Internet bağlantınızı kontrol edin");
                console.log("Internet bağlantınızı kontrol edin");
            });
    };

        secondInput.addEventListener("input", function () {
            const inputValue = secondInput.value.replace(/[^0-9.]/g, '');
            secondInput.value = inputValue;

            calculateOnClassChangeReverse();
        });

        firstInput.addEventListener("input", function () {
            const inputValue = firstInput.value.replace(/[^0-9.]/g, '');
            firstInput.value = inputValue;

            calculateOnClassChange();
        });
        currency.forEach(button => {
            button.addEventListener("click", changeOfCurrencies);
        });

        currency1.forEach(button => {
            button.addEventListener("click", changeOfCurrencies);
        });

        one.forEach(button => {
            button.addEventListener("click", calculateOnClassChange);
        });

        calculateOnClassChange()
    });