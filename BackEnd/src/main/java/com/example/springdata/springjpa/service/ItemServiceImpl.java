package com.example.springdata.springjpa.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springdata.springjpa.model.Item;
import com.example.springdata.springjpa.repository.ItemRepository;

@Service
public class ItemServiceImpl implements ItemService {
	
	@Autowired
	ItemRepository itemRepository;

	@Override
	public Iterable<Item> getAllItems() {
		return itemRepository.findAll();
	}

	@Override
	public void deleteAllItems() {
		itemRepository.deleteAll();
		
	}

	@Override
	public Iterable<Item> getItemsByVenta(long id) {
		return itemRepository.findByVenta(id);
	}

	@Override
	public void AddItem(Item newItem) {
		itemRepository.save(newItem);
		
	}

	@Override
	public Iterable<Item> getItemsByProducto(long id) {
		return itemRepository.findByProdcuto(id);
	}


	

}
