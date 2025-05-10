const defaultColor = 'black';

const CustomStyles = {
  header: {
    style: {
      minHeight: '56px',
      textAlign: 'left',
      overflow: 'visible',
    },
  },
  headRow: {
    // style: {
    //   borderTopStyle: 'solid',
    //   borderTopWidth: '1px',
    //   borderTopColor: defaultColor,
    //   backgroundColor: 'black',
    //   color: 'white',
    //   textAlign: 'center',
    // },
  },
  rows: {
    style: {
      minHeight: '0px',
    },
  },
  headCells: {
    style: {
      flex: 1,
      overflow: 'visible',
      whiteSpace: 'normal',
      fontSize: 12,
      justifyContent: 'left',
      div: {
        overflow: 'visible',
        whiteSpace: 'normal',
      },
    },
  },
  cells: {
    style: {
      fontSize: 11,
      overflow: 'visible',
      whiteSpace: 'normal',
      paddingTop: '0.35rem',
      paddingBottom: '0.35rem',
      div: {
        overflow: 'visible !important',
        whiteSpace: 'normal !important',
      },
    },
  },
};

export default CustomStyles;
