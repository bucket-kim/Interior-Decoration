import styled from 'styled-components';

const FurnitureMenuStyleContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  .furniture-button {
    padding: 2rem 1rem;
  }

  .furniture-categories {
    padding: 1rem 1rem;
    background: #a9b4b98f;
    width: 35dvw;
    height: 100dvh;

    .furniture-menu {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
      border-bottom: 1px solid white;
    }
  }

  .category-header,
  .item-header {
    margin: 1rem 0rem;
  }

  .category-buttons {
    width: 100%;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    button {
      margin: 0.5rem 0rem;
    }
  }

  .item-category {
    margin-top: 1.5rem;
    .item-menu {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
      border-bottom: 1px solid white;
    }

    .item-buttons {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      button {
        margin-bottom: 1rem;
      }
    }
  }
`;

export default FurnitureMenuStyleContainer;
