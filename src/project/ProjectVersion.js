import React, {useEffect, useState} from "react";
import {HOST_ADDRESS} from "../constants/consts";
import * as PropTypes from "prop-types";

export function ProjectVersion(props) {
    const versionId = props.versionId;
    const [projectVersion, setProjectVersion] = useState();

        useEffect(() => {
            if (versionId) {


                fetch(HOST_ADDRESS + `/projects/versions/${versionId}`, {
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                }).then((response) => {

                        if (response.status === 200) {
                            let json = response.json();
                            json.then(data => {
                                setProjectVersion(data);
                            });
                        } else {
                            console.log("An error occurred: " + response.status)
                        }

                    }
                ).catch(error => console.log(`an error occurred ${error}`));
            }
        }, [versionId])


    return (
        <div>
                {projectVersion?.version}
        </div>
    )
}
ProjectVersion.propTypes = {
    versionId: PropTypes.any.isRequired
}

export async function getProjectVersion(versionId) {
    let response = await   fetch(HOST_ADDRESS + `/projects/versions/${versionId}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    return await response.json();
}