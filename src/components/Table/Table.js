import React from 'react';
import Table, { ExampleComponent, List, getName, name } from 'my-own-nit-table'

export const MyTable = ({ columns, headers, data }) => {
    return <div>
        <Table headers={headers} columns={columns} data={data} />
        <ExampleComponent text={`${name}- ${getName()}`} />
        <List names={headers} />
    </div>
};

