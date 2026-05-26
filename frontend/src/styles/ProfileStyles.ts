    // src/styles/ProfileStyles.ts
    import styled from 'styled-components';

    export const ProfileContainer = styled.div`
    padding: ${(props) => props.theme.spacing.medium};
    `;

    export const CoverBlock = styled.div`
    height: 180px;
    background-color: ${(props) => props.theme.colors.text}; /* Fundo escuro por defeito se não houver imagem */
    border-bottom: ${(props) => props.theme.borders.thickness} solid ${(props) => props.theme.colors.border};
    position: relative;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    `;

    export const AvatarBlock = styled.div`
    width: 120px;
    height: 120px;
    background-color: ${(props) => props.theme.colors.border};
    border: ${(props) => props.theme.borders.thickness} solid ${(props) => props.theme.colors.border};
    position: absolute;
    bottom: -60px;
    left: ${(props) => props.theme.spacing.medium};
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    `;

    export const ActionRow = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: ${(props) => props.theme.spacing.medium};
    padding-bottom: 0;
    `;

    export const InfoBlock = styled.div`
    padding: ${(props) => props.theme.spacing.medium};
    border-bottom: ${(props) => props.theme.borders.thickness} solid ${(props) => props.theme.colors.border};
    `;

    export const DisplayName = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 4px;
    `;

    export const Username = styled.p`
    color: ${(props) => props.theme.colors.primary};
    margin-bottom: ${(props) => props.theme.spacing.medium};
    font-weight: bold;
    `;

    export const BioText = styled.p`
    margin-bottom: ${(props) => props.theme.spacing.medium};
    line-height: 1.5;
    `;

    export const StatsRow = styled.div`
    display: flex;
    gap: ${(props) => props.theme.spacing.large};
    margin-bottom: ${(props) => props.theme.spacing.small};

    span {
        font-size: 0.9rem;
    }
    
    strong {
        font-size: 1.1rem;
    }
    `;