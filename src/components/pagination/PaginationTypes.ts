type PaginationTypes = {
    totalPosts:number;
    postsPerPage:number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    currentPage:number;
}

export default PaginationTypes;