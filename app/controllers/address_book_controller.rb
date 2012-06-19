class AddressBookController < ApplicationController

  def index
    @address_book = AddressBook.all 
  end

  def new
    @person = AddressBook.new
  end
end
