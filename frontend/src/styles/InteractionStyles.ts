    // src/styles/InteractionStyles.ts
    import styled from 'styled-components';

    export const ActionContainer = styled.div`
    display: flex;
    gap: ${(props) => props.theme.spacing.medium};
    margin-top: ${(props) => props.theme.spacing.small};
    `;

    // Usamos o prefixo "$" (ex: $active) para que o styled-components 
    // não repasse essa propriedade para o HTML final, evitando avisos no console.
    export const IconButton = styled.button<{ $active?: boolean }>`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border: ${(props) => props.theme.borders.thickness} solid ${(props) => props.$active ? props.theme.colors.primary : 'transparent'};
    background-color: ${(props) => props.$active ? props.theme.colors.primary : 'transparent'};
    color: ${(props) => props.$active ? props.theme.colors.background : props.theme.colors.text};
    font-weight: bold;
    font-size: 0.9rem;

    &:hover {
        border-color: ${(props) => props.theme.colors.text};
        background-color: ${(props) => props.theme.colors.text};
        color: ${(props) => props.theme.colors.background};
    }
    `;

    export const FollowBtn = styled.button<{ $isFollowing?: boolean }>`
    padding: 4px 12px;
    font-size: 0.85rem;
    font-weight: bold;
    text-transform: uppercase;
    border: ${(props) => props.theme.borders.thickness} solid ${(props) => props.theme.colors.text};
    background-color: ${(props) => props.$isFollowing ? props.theme.colors.text : 'transparent'};
    color: ${(props) => props.$isFollowing ? props.theme.colors.background : props.theme.colors.text};
    
    &:hover {
        background-color: ${(props) => props.$isFollowing ? props.theme.colors.primary : props.theme.colors.text};
        border-color: ${(props) => props.$isFollowing ? props.theme.colors.primary : props.theme.colors.text};
        color: ${(props) => props.theme.colors.background};
    }
    `;