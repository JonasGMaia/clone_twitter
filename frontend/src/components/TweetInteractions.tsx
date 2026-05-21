    // src/components/TweetInteractions.tsx
    import React, { useState } from 'react';
    import { api } from '../api/axios';
    import { ActionContainer, IconButton } from '../styles/InteractionStyles';

    interface TweetInteractionsProps {
    tweetId: number;
    initialLikes: number;
    initialComments: number;
    initialHasLiked?: boolean;
    }

    export const TweetInteractions: React.FC<TweetInteractionsProps> = ({ 
    tweetId, 
    initialLikes, 
    initialComments,
    initialHasLiked = false
    }) => {
    const [likes, setLikes] = useState(initialLikes);
    const [hasLiked, setHasLiked] = useState(initialHasLiked);
    const [isLoading, setIsLoading] = useState(false);

    const handleLike = async () => {
        if (isLoading) return;
        setIsLoading(true);
        
        // Atualização otimista
        const newHasLiked = !hasLiked;
        setHasLiked(newHasLiked);
        setLikes((prev) => newHasLiked ? prev + 1 : prev - 1);

        try {
        await api.post(`/tweets/${tweetId}/like/`);
        } catch (error) {
        console.error('Erro ao curtir', error);
        // Reverte o visual se a chamada falhar
        setHasLiked(hasLiked);
        setLikes((prev) => hasLiked ? prev + 1 : prev - 1);
        } finally {
        setIsLoading(false);
        }
    };

    return (
        <ActionContainer>
        <IconButton $active={hasLiked} onClick={handleLike} disabled={isLoading}>
            <span>{hasLiked ? '♥' : '♡'}</span> {likes}
        </IconButton>
        
        <IconButton disabled>
            <span>💬</span> {initialComments}
        </IconButton>
        </ActionContainer>
    );
    };