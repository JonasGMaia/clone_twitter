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

    // Criamos uma interface para tipar os dados que vêm do backend (CommentSerializer)
    interface CommentData {
    id: number;
    author_username: string;
    content: string;
    created_at: string;
    }

    export const TweetInteractions: React.FC<TweetInteractionsProps> = ({ 
    tweetId, 
    initialLikes, 
    initialComments,
    initialHasLiked = false
    }) => {
    // Estados de Curtidas
    const [likes, setLikes] = useState(initialLikes);
    const [hasLiked, setHasLiked] = useState(initialHasLiked);
    const [isLoading, setIsLoading] = useState(false);

    // Estados de Comentários
    const [commentsCount, setCommentsCount] = useState(initialComments);
    const [showCommentsSection, setShowCommentsSection] = useState(false); // Controla a área toda (lista + input)
    const [commentContent, setCommentContent] = useState('');
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);
    
    // Novos estados para a lista de comentários
    const [commentsList, setCommentsList] = useState<CommentData[]>([]);
    const [isLoadingComments, setIsLoadingComments] = useState(false);

    // Função de curtir
    const handleLike = async () => {
        if (isLoading) return;
        setIsLoading(true);
        
        const newHasLiked = !hasLiked;
        setHasLiked(newHasLiked);
        setLikes((prev) => newHasLiked ? prev + 1 : prev - 1);

        try {
        await api.post(`/tweets/${tweetId}/like/`);
        } catch (error) {
        console.error('Erro ao curtir', error);
        setHasLiked(hasLiked);
        setLikes((prev) => hasLiked ? prev + 1 : prev - 1);
        } finally {
        setIsLoading(false);
        }
    };

    // Enviar novo comentário
    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentContent.trim() || isSubmittingComment) return;
        
        setIsSubmittingComment(true);

        try {
        const response = await api.post(`/tweets/${tweetId}/comments/`, { 
            content: commentContent 
        });
        
        setCommentsCount((prev) => prev + 1);
        // Adiciona o novo comentário ao final da lista na tela instantaneamente
        setCommentsList((prev) => [...prev, response.data]);
        setCommentContent('');
        } catch (error) {
        console.error('Erro ao enviar o comentário', error);
        } finally {
        setIsSubmittingComment(false);
        }
    };

    // Alternar visibilidade e buscar comentários na API se necessário
    const toggleCommentsSection = async () => {
        const willShow = !showCommentsSection;
        setShowCommentsSection(willShow);

        // Se vai abrir a seção e a lista ainda está vazia, busca na API
        if (willShow && commentsList.length === 0 && commentsCount > 0) {
        setIsLoadingComments(true);
        try {
            const response = await api.get(`/tweets/${tweetId}/comments/`);
            setCommentsList(response.data);
        } catch (error) {
            console.error('Erro ao carregar comentários', error);
        } finally {
            setIsLoadingComments(false);
        }
        }
    };

    return (
        <>
        <ActionContainer>
            <IconButton $active={hasLiked} onClick={handleLike} disabled={isLoading}>
            <span>{hasLiked ? '♥' : '♡'}</span> {likes}
            </IconButton>
            
            <IconButton onClick={toggleCommentsSection} disabled={isSubmittingComment}>
            <span>💬</span> {commentsCount}
            </IconButton>
        </ActionContainer>

        {/* Seção Dropdown de Comentários */}
        {showCommentsSection && (
            <div style={{ marginTop: '16px', borderTop: '1px solid #333', paddingTop: '16px' }}>
            
            {/* Formulário de Envio */}
            <form onSubmit={handleCommentSubmit} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <input 
                type="text" 
                placeholder="Escreva um comentário..."
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                disabled={isSubmittingComment}
                style={{ 
                    flex: 1, 
                    padding: '10px', 
                    borderRadius: '8px', 
                    border: '1px solid #444', 
                    backgroundColor: 'transparent',
                    color: 'inherit'
                }}
                />
                <button 
                type="submit" 
                disabled={isSubmittingComment || !commentContent.trim()}
                style={{ 
                    padding: '8px 16px', 
                    borderRadius: '8px', 
                    cursor: 'pointer',
                    backgroundColor: isSubmittingComment || !commentContent.trim() ? '#555' : '#1da1f2',
                    color: 'white',
                    border: 'none',
                    fontWeight: 'bold'
                }}
                >
                {isSubmittingComment ? '...' : 'Postar'}
                </button>
            </form>

            {/* Lista de Comentários */}
            {isLoadingComments ? (
                <p style={{ fontSize: '0.9rem', color: '#888' }}>Carregando comentários...</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {commentsList.length > 0 ? (
                    commentsList.map((comment) => (
                    <div key={comment.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#888' }}>
                        @{comment.author_username}
                        </span>
                        <p style={{ margin: 0, fontSize: '0.95rem' }}>{comment.content}</p>
                    </div>
                    ))
                ) : (
                    <p style={{ fontSize: '0.9rem', color: '#888', textAlign: 'center' }}>
                    Ainda não há comentários. Seja o primeiro!
                    </p>
                )}
                </div>
            )}
            </div>
        )}
        </>
    );
    };