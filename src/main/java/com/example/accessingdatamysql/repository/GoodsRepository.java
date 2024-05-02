package com.example.accessingdatamysql;

import org.springframework.data.repository.CrudRepository;

import com.example.accessingdatamysql.Goods;

public interface GoodsRepository extends CrudRepository<Goods, Integer> {

}
