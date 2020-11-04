import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {getProjectsOfUser} from "../rest-service/ProjectService";
import * as PropTypes from "prop-types";
import {UserFullNameWithLinkToPage} from "../user/UserInfo";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export function ProjectsTable(userId) {
    const [projects, setProjects] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        getProjectsOfUser(userId).then(data => setProjects(data.content));
    }, [userId]);


    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell><Typography variant="h6">
                            Name
                        </Typography></TableCell>
                        <TableCell> <Typography variant="h6">
                            Key
                        </Typography></TableCell>

                        <TableCell align="right"><Typography variant="h6">
                            Owner
                        </Typography></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {projects?.map((project) => (
                        <TableRow key={project.id}>

                            <TableCell>
                                <Link to={`/projects/${project.id}`} >
                                <Typography variant="body1" style={{color:'blue'}}>
                                    {project.name}
                                </Typography>
                            </Link>
                            </TableCell>


                            <TableCell component="th" scope="row">
                                <Typography variant="body1">
                                    {project.id}
                                </Typography>

                            </TableCell>

                            <TableCell align="right">
                                <Typography variant="body1">
                                    <UserFullNameWithLinkToPage userId={project.creatorId}/>
                                </Typography>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


ProjectsTable.propTypes = {
    userId: PropTypes.string.isRequired
}

