    // src/styles/FeedStyles.ts
    import styled from 'styled-components';

    export const FeedHeader = styled.header`
    padding: ${(props) => props.theme.spacing.medium};
    border-bottom: ${(props) => props.theme.borders.thickness} solid ${(props) => props.theme.colors.border};
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
    `;

    export const ComposeBox = styled.div`
    padding: ${(props) => props.theme.spacing.medium};
    border-bottom: ${(props) => props.theme.borders.thickness} solid ${(props) => props.theme.colors.border};
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.colors.surface};
    `;

    export const ComposeTextArea = styled.textarea`
    width: 100%;
    min-height: 100px;
    padding: ${(props) => props.theme.spacing.small};
    font-family: inherit;
    font-size: 1.1rem;
    border: none;
    resize: none;
    background-color: transparent;

    &:focus {
        outline: none;
    }
    `;

    export const ComposeAction = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: ${(props) => props.theme.spacing.small};
    `;

    export const TweetCard = styled.article`
    padding: ${(props) => props.theme.spacing.medium};
    border-bottom: ${(props) => props.theme.borders.thickness} solid ${(props) => props.theme.colors.border};
    background-color: ${(props) => props.theme.colors.background};
    
    &:hover {
        background-color: ${(props) => props.theme.colors.surface};
    }
    `;

    export const TweetAuthor = styled.span`
    font-weight: bold;
    margin-bottom: ${(props) => props.theme.spacing.small};
    display: block;
    `;

    export const TweetContent = styled.p`
    margin-bottom: ${(props) => props.theme.spacing.medium};
    line-height: 1.5;
    `;