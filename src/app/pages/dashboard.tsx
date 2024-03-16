import { useEffect, useState } from'react';
import { DetailsList, IColumn, SelectionMode } from '@fluentui/react/lib/DetailsList';
import { Spinner } from'@fluentui/react/lib/Spinner';
import { Stack } from'@fluentui/react/lib/Stack';
import { IStackTokens } from'@fluentui/react/lib/Stack';
import { mergeStyleSets } from'@fluentui/react/lib/Styling';
// Define the styling for the components
const classNames = mergeStyleSets({
    filter: {
        marginBottom:'20px',
    },
    list: {
        overflow:'auto',
    },
});

// Define the spacing between stack items
const stackTokens: IStackTokens = { childrenGap: 20 };

// Define the columns for the DetailsList component
const columns: IColumn[] = [
    { key:'column1', name:'Case ID', fieldName:'id', minWidth: 50, maxWidth: 100, isResizable: true },
    { key:'column2', name:'Title', fieldName:'title', minWidth: 100, maxWidth: 200, isResizable: true },
    { key:'column3', name:'Status', fieldName:'status', minWidth: 70, maxWidth: 90, isResizable: true },
    { key:'column4', name:'Importance', fieldName:'importance', minWidth: 70, maxWidth: 90, isResizable: true },
    // can add more columns as needed
];

const DashboardPage = () => {
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    // Fetch the support cases from your API and set the cases state
    // For example:
    // fetch('/api/support-cases')
    // .then(response => response.json())
    // .then(data => {
    // setCases(data);
    // setLoading(false);
    // });
    }, []);

// Function to handle sorting by importance
    const sortCasesByImportance = () => {
    const sortedCases = [...cases].sort((a: any, b: any) => b.importance - a.importance);
    setCases(sortedCases);
    };

    return (
    <Stack tokens={stackTokens}>
    <Stack.Item align="start" className={classNames.filter}>
        {/* Add filter components here */}
    </Stack.Item>
    <Stack.Item className={classNames.list}>
    {loading ? (
            <Spinner label="Loading cases..." />
    ) : (
                <DetailsList
                    items={cases}
                    columns={columns}
                    setKey="set"
                    selectionMode={SelectionMode.none}
                    onRenderItemColumn={_renderItemColumn}
                    onColumnHeaderClick={sortCasesByImportance}
                />
            )
    }
    </Stack.Item>
    </Stack>
    );
};
// Custom render function for item columns (optional)
const _renderItemColumn = (item: any, index: number, column:
IColumn) => {
    const fieldContent = item[column.fieldName as keyof typeof item] as string;
    switch (column.key) {
    // Custom rendering for specific columns

        case'column1':
        // Render the Case ID column
         return <span>{fieldContent}</span>;
        case'column2':
        // Render the Title column
         return <span>{fieldContent}</span>;
        case'column3':
        // Render the Status column
         return <span>{fieldContent}</span>;
        case'column4':
        // Render the Importance column
         return <span>{fieldContent}</span>;
        // Add custom rendering for other columns as needed
        default:
         return <span>{fieldContent}</span>;
    }
};

export default DashboardPage;