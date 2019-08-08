import React from 'react';
import { Table } from 'reactstrap';

export default class FileTable extends {
    constructor() {
        super(props);
    }

    render() {
        return(
            <Table>
                <thead>
                    <tr>
                        <th>文件名</th>
                        <th>上传时间</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </Table>
        );
    }
}


