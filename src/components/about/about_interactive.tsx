import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

export default function () {

    return <Box

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
                window.location.href = "./#contact";
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
                        "https://tumzied.pythonanywhere.com/media/documents/CV-Abdur-Rahman-Tumzied.pdf",
                        "_blank"
                    );
                }}
            >
                <i className="fa-solid fa-file-export"></i>
            </Button>
        </Tooltip>
    </Box>
}