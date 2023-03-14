import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

export interface AboutInteractiveProps{
    className?:string
    resume_link?:string
    contract_link?:string
}

export default function ({className,resume_link, contract_link='./#contact'}:AboutInteractiveProps) {

    return <Box
        className={className}
        sx={{
            display: "flex",
            gap: "5px",
        }}
    >
        <Button

            sx={{
                backgroundColor: "var(--primary-color)",
                // borderRadius:1,
            }}
            size="medium"
            variant="contained"
            onClick={() => {
                window.location.href = contract_link;
            }}
        >
            Contact ME
        </Button>
        <Tooltip title="Download Resume" >

            <Button

                variant="contained"
                
                sx={{
                    backgroundColor: "var(--primary-color)",
                    color: "white",
                    minWidth: 0,
                    fontSize: 20,
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    // borderRadius:1,
                }}
                onClick={() => {
                    window.open(
                        resume_link,
                        "_blank"
                    );
                }}
            >
                <i className="fa-solid fa-file-export"></i>
            </Button>
        </Tooltip>
    </Box>
}