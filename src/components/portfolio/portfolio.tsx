import {  useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import classNames from 'classnames';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import styles from './portfolio.module.css'
import { Project } from '../../interfaces';
import { ArticleCard } from '../article_card/article_card';
import useFetch from '../../utils/use_fetch';

gsap.registerPlugin(ScrollTrigger);

interface PortfolioProps {
    className: string,
}

export const Portfolio = ({ className = "" }: PortfolioProps) => {
    const { loading, data, error } = useFetch<Project>('/api/projects/');
    useLayoutEffect(() => {
        gsap.to(".article_card", {
            scrollTrigger: {
                trigger: ".article_card",
                toggleActions: "play none none none",
                start: "-100px 95%"
            },
            opacity: 1,
            ease: "power3.inOut",
            duration: 2,
            stagger: 0.3,
        })
    }, [loading])

    return <section className={classNames(styles.portfolioSection, className)}>
        <header>
            <h2 className='text-center'>My Works </h2>
        </header>
        <main className={styles.articles} data-item={loading}>
            {!loading ?
                data.map((value: Project, i) => {
                    return <ArticleCard data={value} key={i} />
                })

                : <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            }


        </main>

    </section>
}

