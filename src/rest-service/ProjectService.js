import {HOST_ADDRESS} from "../constants/consts";



export function createProject(data) {
    fetch(HOST_ADDRESS + '/projects', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(data)
    })
        .then((response) => {
                if (response.status === 200) {
                    console.log(`Project successfully created ${JSON.stringify(data)}`);

                } else {
                    console.log(`Data Sent. ${JSON.stringify(data)}`);
                    response.json().then(data => alert(`Error: code - ${data.status} message: ${data.message}`))
                }
            }
        )

        .catch(error => console.log(`an error occurred ${error}`));
}



