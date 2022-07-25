import React from 'react';
import { connect } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

import './popup-message.styles.scss';

const PopupMessage = ({ popupMessage }) => {
    return (
        <AnimatePresence>
            {popupMessage?.message ? (
                <motion.div
                    key="popup-message"
                    className={`popup-message ${
                        popupMessage.type === 'error' ? 'error' : ''
                    }`}
                    initial={{
                        opacity: 0,
                        scale: 0.5,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                    }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                    <p>{popupMessage.message}</p>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
};

const useStateToProps = state => ({
    popupMessage: state.popupMessage.messageData,
});

export default connect(useStateToProps)(PopupMessage);
