class MasonryGrid {
    constructor(gridElement, columns = 2, gap = 68) {
        this.grid = gridElement;
        this.items = Array.from(this.grid.getElementsByClassName('grid-item'));
        this.columns = columns;
        this.gap = gap;
        this.init();
    }

    init() {
        this.layout();
        window.addEventListener('resize', () => this.layout());
    }

    layout() {
        const containerWidth = this.grid.offsetWidth;
        const itemWidth = (containerWidth - (this.gap * (this.columns - 1))) / this.columns;

        // Reset positions
        this.items.forEach(item => {
            item.style.width = itemWidth + 'px';
        });

        // Calculate columns
        let columnsHeight = new Array(this.columns).fill(0);
        let positions = [];

        this.items.forEach((item, index) => {
            // Find the shortest column
            const minHeight = Math.min(...columnsHeight);
            const columnIndex = columnsHeight.indexOf(minHeight);

            // Calculate x and y position
            const x = columnIndex * (itemWidth + this.gap);
            const y = minHeight;

            // Store position
            positions.push({ x, y });

            // Update column height
            columnsHeight[columnIndex] = minHeight + item.offsetHeight + this.gap;
        });

        // Set grid container height
        const maxHeight = Math.max(...columnsHeight);
        this.grid.style.height = maxHeight + 'px';

        // Apply positions with transition
        this.items.forEach((item, index) => {
            item.style.transform = `translate(${positions[index].x}px, ${positions[index].y}px)`;
        });

        // Update columns based on screen width
        if (containerWidth <= 600) {
            this.columns = 1;
        } else if (containerWidth <= 900) {
            this.columns = 2;
        } else {
            this.columns = 3;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const masonry = new MasonryGrid(grid);
});
