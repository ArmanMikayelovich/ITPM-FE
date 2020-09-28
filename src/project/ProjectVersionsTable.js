import React, {useEffect, useState} from "react";
import {HOST_ADDRESS} from "../constants/consts";
import * as PropTypes from "prop-types";

export function ProjectVersionsTable(props) {
    const projectId = props.projectId;
    const [versions, setVersions] = useState();
    useEffect(() => {
        fetch(HOST_ADDRESS + `/projects/${projectId}/versions`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'

            },
        })
            .then((response) => {
                    if (response.status === 200) {
                        let json = response.json();
                        json.then(data => {
                            let formattedVersions = data.map(version =>
                                <tr key={version.id}>
                                    <th>
                                        {version.version}
                                    </th>
                                    <th>
                                        {version.versionStatus}
                                    </th>
                                    <th>
                                        {version.registrationDate}
                                    </th>
                                </tr>);
                            setVersions(formattedVersions);
                        });
                    } else {
                        response.json()
                            .then(data => console.log(`Error in fetching project version: code - ${data.status} message: ${data.message}`))
                    }
                }
            )

            .catch(error => console.log(`an error occurred ${error}`));
    }, [projectId]);

    return (
        <div>
            <table>
                <thead>
                    <th>Version</th>
                    <th>status</th>
                    <th>Registration date</th>
                </thead>
                <tbody>
                {versions}
                </tbody>

            </table>
        </div>
    )

}

ProjectVersionsTable.propTypes = {
    projectId: PropTypes.string.isRequired
}