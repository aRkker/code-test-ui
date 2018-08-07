import React, { PureComponent } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';


class DebitTable extends PureComponent {

    constructor(props, context) {
        super(props, context);

        console.log(props);
    }

    render() {
        if (this.props.data.length === 0) return <div />;
        return <ReactTable 
            data={this.props.data}
            filterable
            defaultFilterMethod={(filter, row) => 
                String(row[filter.id]).toLowerCase().includes(filter.value)  }
            columns={[
               {
                   Header: 'General',
                   columns: [
                       {
                           Header: "Ref",
                           accessor: "ref",
                     //      maxWidth: 100
                       },
                       {
                            Header: "Trans code",
                            accessor: "transCode",
                         //   maxWidth: 110
                       },
                       {
                           Header: "Return code",
                           accessor: "returnCode",
                       //    maxWidth: 110
                       },
                       {
                            Header: "Description",
                            accessor: "returnDescription"  
                       },
                       {
                           Header: "Original processing date",
                           accessor: "originalProcessingDate"
                       },
                       {
                           Header: "Value",
                           id: "valueOf",
                           accessor: r => r.valueOf[0]
                       },
                       {
                           Header: "Currency",
                           accessor: "currency"
                       }
                   ]
               },
               {
                   Header: "Payer account",
                   columns: [
                       {
                           Header: "Number",
                           id: "PayerAccount1",
                           accessor: r => r.PayerAccount.number
                       },
                        {
                            Header: "Ref",
                            id: "PayerAccount2",
                            accessor: r => r.PayerAccount.ref
                        },
                        {
                            Header: "Name",
                            id: "PayerAccount3",
                            accessor: r => r.PayerAccount.name
                        },
                        {
                            Header: "Sort code",
                            id: "PayerAccount4",
                            accessor: r => r.PayerAccount.sortCode
                        },
                        {
                            Header: "Bank Name",
                            id: "PayerAccount5",
                            accessor: r => r.PayerAccount.bankName
                        },
                        {
                            Header: "Branch name",
                            id: "PayerAccount6",
                            accessor: r => r.PayerAccount.branchName
                        },
                        
                        
                   ]
               }
            ]}

        />;
    }
}

export default DebitTable;