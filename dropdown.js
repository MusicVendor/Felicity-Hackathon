// Function to add dropdown functionality to the category filter
function initCategoryFilterDropdown() {
    const moreButton = document.querySelector('.category-filter .filter-button:last-child');
    
    // Create dropdown content
    const dropdownContent = document.createElement('div');
    dropdownContent.className = 'dropdown-content category-dropdown-content';
    dropdownContent.style.display = 'none';
    dropdownContent.style.position = 'absolute';
    dropdownContent.style.backgroundColor = 'var(--card-bg)';
    dropdownContent.style.minWidth = '200px';
    dropdownContent.style.boxShadow = 'var(--shadow)';
    dropdownContent.style.zIndex = '1';
    dropdownContent.style.borderRadius = '4px';
    dropdownContent.style.border = '1px solid var(--card-border)';
    dropdownContent.style.marginTop = '5px';
    // Center dropdown below its button
dropdownContent.style.left = '47%';
dropdownContent.style.marginTop = '25%';

    
    // Add dropdown items
    const categories = [
      'Civil Engineering',
      'Mechanical Engineering',
      'Electrical Engineering',
      'Physics',
      'Chemistry',
      'Biology',
      'Mathematics'
    ];
    
    categories.forEach(category => {
      const item = document.createElement('div');
      item.className = 'dropdown-item';
      item.textContent = category;
      item.style.padding = '10px 15px';
      item.style.cursor = 'pointer';
      item.style.color = 'var(--text-color)';
      item.style.transition = 'var(--transition)';
      
      item.addEventListener('mouseover', function() {
        this.style.backgroundColor = 'var(--primary-color)';
        this.style.color = 'white';
      });
      
      item.addEventListener('mouseout', function() {
        this.style.backgroundColor = '';
        this.style.color = 'var(--text-color)';
      });
      
      item.addEventListener('click', function() {
        // Handle category selection
        const filterButtons = document.querySelectorAll('.category-filter .filter-button');
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Update active category display
        const categoryButtons = document.querySelectorAll('.category-filter .filter-button:not(:last-child)');
        let categoryFound = false;
        
        categoryButtons.forEach(btn => {
          if (btn.textContent === category) {
            btn.classList.add('active');
            categoryFound = true;
          }
        });
        
        // If category not in main buttons, add active class to dropdown button
        if (!categoryFound) {
          moreButton.classList.add('active');
          // Could optionally add code here to replace one of the visible buttons with this category
        }
        
        // Close dropdown
        dropdownContent.style.display = 'none';
        
        // Add visual feedback
        console.log(`Selected category: ${category}`);
      });
      
      dropdownContent.appendChild(item);
    });
    
    // Append dropdown to the category filter section
    const categoryFilter = document.querySelector('.category-filter');
    categoryFilter.style.position = 'relative';
    categoryFilter.appendChild(dropdownContent);
    
    // Add click event to more button
    moreButton.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent bubbling to document
      if (dropdownContent.style.display === 'none') {
        dropdownContent.style.display = 'block';
      } else {
        dropdownContent.style.display = 'none';
      }
    });
    
    // Close dropdown when clicking elsewhere on the page
    document.addEventListener('click', function() {
      dropdownContent.style.display = 'none';
    });
  }
  
  // Function to add dropdown functionality to filter dropdowns (Topic and Institutes)
  function initFilterDropdowns() {
    const filterDropdowns = document.querySelectorAll('.filter-dropdown');
    
    filterDropdowns.forEach(dropdown => {
      // Make the dropdown button have position relative for proper positioning
      dropdown.style.position = 'relative';
      
      // Create dropdown content
      const dropdownContent = document.createElement('div');
      dropdownContent.className = 'dropdown-content filter-dropdown-content';
      dropdownContent.style.display = 'none';
      dropdownContent.style.position = 'absolute';
      dropdownContent.style.backgroundColor = 'var(--card-bg)';
      dropdownContent.style.minWidth = '200px';
      dropdownContent.style.boxShadow = 'var(--shadow)';
      dropdownContent.style.zIndex = '1';
      dropdownContent.style.borderRadius = '4px';
      dropdownContent.style.border = '1px solid var(--card-border)';
      dropdownContent.style.marginTop = '5px';
      
      // Center dropdown below its button
      dropdownContent.style.left = '36%';
      dropdownContent.style.transform = 'translateX(-1%)';
      
      // Add dropdown items based on the button type
      let items = [];
      
      if (dropdown.textContent === 'Topic') {
        items = ['Algorithms', 'Sorting', 'Data Structures', 'Circuits', 'Signal Processing', 'Machine Learning'];
      } else if (dropdown.textContent === 'Institutes') {
        items = ['IIIT Hyderabad', 'IIT Delhi', 'IIT Bombay', 'IIT Madras', 'IIT Kanpur', 'BITS Pilani'];
      }
      
      items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'dropdown-item';
        itemElement.textContent = item;
        itemElement.style.padding = '10px 15px';
        itemElement.style.cursor = 'pointer';
        itemElement.style.color = 'var(--text-color)';
        itemElement.style.transition = 'var(--transition)';
        
        // Add hover effects
        itemElement.addEventListener('mouseover', function() {
          this.style.backgroundColor = 'var(--primary-color)';
          this.style.color = 'white';
        });
        
        itemElement.addEventListener('mouseout', function() {
          this.style.backgroundColor = '';
          this.style.color = 'var(--text-color)';
        });
        
        // Add click event
        itemElement.addEventListener('click', function(e) {
          e.stopPropagation(); // Prevent bubbling
          
          // Update button to show selection
          dropdown.innerHTML = `${item} <span style="margin-left: 5px;">▾</span>`;
          
          // Close dropdown
          dropdownContent.style.display = 'none';
          
          // Add visual feedback
          console.log(`Selected ${dropdown.textContent.replace(' ▾', '')}: ${item}`);
          
          // Here you could trigger filtering of the lab cards based on selection
          filterLabCards();
        });
        
        dropdownContent.appendChild(itemElement);
      });
      
      // Add dropdown content to the DOM
      dropdown.after(dropdownContent);
      
      // Toggle dropdown on button click
      dropdown.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent bubbling to document
        
        // Close all other dropdowns first
        document.querySelectorAll('.dropdown-content').forEach(content => {
          if (content !== dropdownContent) {
            content.style.display = 'none';
          }
        });
        
        // Toggle this dropdown
        if (dropdownContent.style.display === 'none') {
          dropdownContent.style.display = 'block';
        } else {
          dropdownContent.style.display = 'none';
        }
      });
    });
    
    // Close dropdowns when clicking elsewhere
    document.addEventListener('click', function() {
      document.querySelectorAll('.dropdown-content').forEach(content => {
        content.style.display = 'none';
      });
    });
  }
  
  // Function to filter lab cards (placeholder implementation)
  function filterLabCards() {
    // This would be where you implement the actual filtering logic
    // For now, just add a class to show it's working
    const labCards = document.querySelectorAll('.lab-card');
    labCards.forEach(card => {
      card.classList.add('filtered');
      
      // Remove the class after a brief flash to show the filter was applied
      setTimeout(() => {
        card.classList.remove('filtered');
      }, 500);
    });
  }
  
  // Initialize dropdowns when the document is loaded
  document.addEventListener('DOMContentLoaded', function() {
    initCategoryFilterDropdown();
    initFilterDropdowns();
    
    // Add clear button functionality
    const clearButton = document.querySelector('.clear-button');
    clearButton.addEventListener('click', function() {
      // Reset topic and institutes dropdowns
      document.querySelectorAll('.filter-dropdown').forEach(dropdown => {
        const originalText = dropdown.textContent.split(' ')[0];
        dropdown.innerHTML = originalText;
      });
      
      // Reset category filter
      const filterButtons = document.querySelectorAll('.category-filter .filter-button');
      filterButtons.forEach(btn => btn.classList.remove('active'));
      filterButtons[0].classList.add('active'); // Set "All" button as active
      
      // Refresh lab cards display
      filterLabCards();
    });
    
    // Additional CSS for highlighting filtered cards
    
  });