import { Box, Fade, Modal, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import classNames from 'classnames';
import styles from './article_card.module.css'
import Configs from "../../configs.json";
import { useState } from 'react';
import type { Project } from '../../interfaces';

interface ArticleCardProps {
    data: Project
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "70%",
    maxWidth: "768px",
    boxShadow: 24,
    p: 1,
    color: 'var(--secondary-color)',
    background: "#303030",
    borderRadius: "6px",
};

export function ArticleCard({ data }: ArticleCardProps) {
    const [modalOpen, setModalOpen] = useState(false)
    const handleClose = () => {
        setModalOpen(v=>!v);
    }
    return <article className={classNames(styles.portfolioArticle, "article_card")} onClick={() => setModalOpen(true)}>
        {/* <img src={gradient_tools_pic} alt="" /> */}
        {/* <img src={`${CONST['BASE_API']}${data.imgname}`} alt="" /> */}
        <h3>{data.title}</h3>
        <footer>
            <div className={styles.iconWrapper}>

                <Tooltip title="View Demo">
                    <a href={data.live_demo} target="_blank" rel="noopener noreferrer">
                        <i className="fa-solid fa-eye"></i>
                    </a>
                </Tooltip>
            </div>
            <div className={styles.iconWrapper}>

                <Tooltip title="View Source-Code">
                    <a href={data.sorcecode} target="_blank">
                        <i className="fa-solid fa-code"></i>
                    </a>
                </Tooltip>

            </div>

            <IconButton
                sx={{
                    color: "white"
                }}
                onClick={() => { setModalOpen(true) }}
            >


                <Tooltip title="find more">

                    <i className="fa-solid fa-ellipsis-vertical"></i>


                </Tooltip>

            </IconButton>


        </footer>
        <Modal
            open={modalOpen}
            onClose={handleClose}
            aria-labelledby={data.title}
            aria-describedby="sort description about this project"

        >
            <Fade in={modalOpen}>
                <Box sx={style}>
                    <div className={styles.modalInnerContent}>


                        <img src={`${Configs['BASE_API']}${data.imgname}`} alt="" />

                        <section className={styles.textContent}>
                            <main>

                                <p>
                                    <strong>
                                        {data.title}
                                    </strong>
                                </p>
                                <p>
                                    {data.discribtion}

                                </p>
                            </main>
                            <footer>

                                <div>


                                    <a href={data.sorcecode} target="_blank" rel="noopener noreferrer">
                                        <i className="fa-solid fa-arrow-up-right-from-square"></i> Github
                                    </a>
                                    &nbsp;
                                    &nbsp;
                                    &nbsp;

                                    <a href={data.live_demo || "#"} target="_blank" rel="noopener noreferrer">
                                        <i className="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
                                    </a>

                                </div>
                                <div>
                                    <IconButton
                                        onClick={()=>handleClose()}
                                        sx={{
                                            color: "var(--secondary-color)"
                                        }}
                                    >
                                        <i className="fa-solid fa-xmark"></i>
                                    </IconButton>
                                </div>


                            </footer>
                        </section>
                    </div>
                </Box>
            </Fade>
        </Modal>
    </article>;
}
