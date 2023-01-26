import { useState } from 'react';
import GitHubButton from 'react-github-btn'
import CrossIcon from '../../public/images/CrossIcon';
import { motion } from "framer-motion";
import { AutoComplete } from 'antd';

export const GithubPopup = () => {
    const [hide, setHide] = useState(false);

    return (
        <>
            {!hide &&
                <motion.div
                    initial={{ bottom: -200 }}
                    animate={{
                        bottom: 18,
                    }}
                    transition={{
                        type: "spring",
                        bounce: 0.4,
                        duration: 0.8,
                        delay: 1
                    }}
                    style={{
                        position: "fixed",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 2000,
                    }}
                >
                    <div style={{
                        backgroundColor: "#6C37F4",
                        height: 54,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        borderRadius: 35,
                        padding: "0 24px 0 24px",
                        border: "3px solid #0d0225"
                    }}>
                        <div style={{ fontSize: 18, fontWeight: "400", color: "white" }}>
                            Star us on GitHub
                        </div>
                        <GitHubButton
                            href="https://github.com/highlight/highlight"
                            data-color-scheme="no-preference: light; light: light; dark: light;"
                            data-size="large"
                            data-show-count="true"
                            aria-label="Star highlight/highlight on GitHub">Star
                        </GitHubButton>
                        <button onClick={() => setHide(true)}>
                            <CrossIcon />
                        </button>
                    </div >
                </motion.div>
            }
        </>
    );
}