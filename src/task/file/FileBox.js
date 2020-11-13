import React from "react";
import Typography from "@material-ui/core/Typography";
import * as PropTypes from "prop-types";
import {makeStyles} from '@material-ui/core/styles';
import {DeleteFileButton} from "../DeleteFileButton";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
    root: {
        width: 165,
        height: 160
    },

    title: {
        fontSize: 14,
    },

});

export function FileBox(props) {
    const classes = useStyles();
    const file = props.file;
    const canDelete = props.canDelete;
    return (
        /*  <div>
              <Box    style={{ width:120, height:120, backgroundColor:'white'}} borderRadius={12} border={1} borderColor="grey.500" >
                  <Typography style={{ color : 'black',paddingLeft:5}} variant="subtitle1" >
                      {file.fileName}
                  </Typography>
                  {canDelete && <DeleteFileButton taskId={file.taskId} fileId={file.id} /> }
              </Box>
          </div>
          */
        <div>
            <Card className={classes.root}>
                <CardContent style={{height:110,width:165, overflow:'auto'}}>
                        <Typography style={{color: 'black'}} variant="subtitle1">
                            {file.fileName}
                        </Typography>
                </CardContent>
                <CardActions>
                    {canDelete && <DeleteFileButton taskId={file.taskId} fileId={file.id}/>}
                </CardActions>
            </Card>
        </div>
    )
}

FileBox.propTypes = {
    file: PropTypes.object.isRequired,
    canDelete: PropTypes.bool.isRequired
}