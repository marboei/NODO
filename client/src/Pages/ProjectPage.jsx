// @flow 
import * as React from 'react';
import {Column} from "../Components/Column";
import {Grid} from "@mui/material";
import {useEffect, useState} from "react";
import agent from "../Data/agent";

export const ProjectPage = () => {
    const [columns, setColumns] = useState([]);

    useEffect(async () => {
        setColumns(await agent.getColumns())
    },[])


    return (
        <div>
            <Grid container>
                {columns.map(column =>  (
                    <Grid item xs={3} key={column.id}>
                        <Column column={column}/>
                    </Grid>
                ))}
                
            </Grid>
            
        </div>
    );
};