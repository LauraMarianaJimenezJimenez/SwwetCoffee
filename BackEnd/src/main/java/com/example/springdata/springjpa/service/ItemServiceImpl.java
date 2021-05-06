package com.example.springdata.springjpa.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.springdata.springjpa.model.Item;
import com.example.springdata.springjpa.repository.ItemRepository;

@Service
public class ItemServiceImpl implements ItemService {
	
	@Autowired
	ItemRepository itemRepository;

	@Override
	public Page<Item> getAllItems(PageRequest pageRequest) {
		return itemRepository.findAll(pageRequest);
	}

	@Override
	public void deleteAllItems() {
		itemRepository.deleteAll();
		
	}

	@Override
	public Page<Item> getItemsByVenta(long id, PageRequest pageRequest) {
		return itemRepository.findByVenta(id, pageRequest);
	}

	@Override
	public Item addItem(Item newItem) {
		return itemRepository.save(newItem);
		
	}

	@Override
	public List<Item> getItemsByProducto(long id) {
		return itemRepository.findByProdcuto(id);
	}


	

}
