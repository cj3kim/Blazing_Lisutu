class AddressBookController < ApplicationController

  def index
    @address_book = AddressBook.all 
  end
end
