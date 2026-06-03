    // src/components/FollowButton.tsx
    import React, { useState } from 'react';
    import { api } from '../api/axios';
    import { FollowBtn } from '../styles/InteractionStyles';

    interface FollowButtonProps {
    username: string;
    initialIsFollowing?: boolean;
    }

    export const FollowButton: React.FC<FollowButtonProps> = ({ username, initialIsFollowing = false }) => {
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
    const [isLoading, setIsLoading] = useState(false);

    const handleToggleFollow = async () => {
        if (isLoading) return;
        setIsLoading(true);
        
        // Atualização otimista: inverte o visual imediatamente
        setIsFollowing(!isFollowing);
        
        try {
        // Usa SEMPRE a mesma rota POST, pois o backend já faz o papel de "Toggle"
        await api.post(`/users/${username}/follow/`);
        } catch (error) {
        console.error('Erro ao seguir/deixar de seguir', error);
        // Reverte se a API falhar (que era o que estava acontecendo)
        setIsFollowing(isFollowing);
        } finally {
        setIsLoading(false);
        }
    };

    return (
        <FollowBtn 
        $isFollowing={isFollowing} 
        onClick={handleToggleFollow} 
        disabled={isLoading}
        >
        {isFollowing ? 'Seguindo' : 'Seguir'}
        </FollowBtn>
    );
    };